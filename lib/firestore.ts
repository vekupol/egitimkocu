import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import type { Coach } from "@/types";

/**
 * Tüm koçları getirir, users koleksiyonundaki premium/verified bilgilerini merge eder.
 */
export async function listCoaches({ premiumFirst = false } = {}): Promise<
  Coach[]
> {
  let q = query(collection(db, "coaches"));
  if (premiumFirst) {
    // premium alanı coacheste yok, createdAt ile sıralıyoruz
    q = query(collection(db, "coaches"), orderBy("createdAt", "desc"));
  }

  const snap = await getDocs(q);
  const items: Coach[] = [];

  for (const d of snap.docs) {
    const coachData = d.data();
    const uid = coachData.uid;

    // users koleksiyonundan premium/verified bilgisi çek
    let userData: any = {};
    try {
      const userSnap = await getDoc(doc(db, "users", uid));
      if (userSnap.exists()) {
        userData = userSnap.data();
      }
    } catch (err) {
      console.error("User fetch error for uid:", uid, err);
    }

    items.push({
      uid,
      ...coachData,
      premium: userData?.premium || false,
      verified: userData?.verified || false,
    } as Coach);
  }

  return items;
}

/**
 * Tek bir koçu uid’ye göre getirir.
 */
export async function getCoach(uid: string): Promise<Coach | null> {
  const ref = doc(db, "coaches", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  return { uid, ...snap.data() } as Coach;
}

/**
 * Koç bilgisini kaydeder/günceller.
 */
export async function upsertCoach(uid: string, data: Partial<Coach>) {
  const ref = doc(db, "coaches", uid);
  await setDoc(
    ref,
    {
      ...data,
      uid,
      updatedAt: Date.now(),
    },
    { merge: true }
  );
}

/**
 * Kullanıcıyı `users` koleksiyonuna kaydeder (ilk defa giriş yapıyorsa).
 */
export async function ensureUser(uid: string, email?: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid,
      email: email || null,
      premium: false,
      verified: false,
      createdAt: serverTimestamp(),
    });
  }
}
