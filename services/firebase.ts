// track the searches made by a user 
import { collection, query, where, getDocs, addDoc, updateDoc, increment } from "firebase/firestore"
import { db } from "@/firebaseConfig"

export const updateSearchCount = async (queryTerm: string, movie: any, userId?: string) => {
    try {
         if (!queryTerm || queryTerm.trim() === "") {
            console.warn("updateSearchCount skipped — missing or empty queryTerm");
            return;
        }

        const metricsRef = collection(db, "metrics");
        const q = query(
            metricsRef,
            where("movie_id", "==", movie.id.toString())
        );

        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await updateDoc(docRef, {
                count: increment(1),
                searchTerm: queryTerm
            });
        } else {
            await addDoc(metricsRef, {
                count: 1,
                movie_id: movie.id.toString(),
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}` || "",
                searchTerm: queryTerm,
                title: movie.title,
                userId: userId || null,
            });
        }
    } catch (error) {
        console.error("Error updating search count: ", error);
    }
}