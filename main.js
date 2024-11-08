import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {
    getStorage,
    ref,
    uploadBytes,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";


if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("sw.js")
            .then((registration) => {
                console.log("Service Worker registered: ", registration);
            })
            .catch((registrationError) => {
                console.error(
                    "Service Worker registration failed: ",
                    registrationError
                );
            });
    });
}

const firebaseConfig = {
    apiKey: "AIzaSyCHtoyhT-yRgRvvrW9_4JYHQimh51LFdzc",
    authDomain: "fastresponse-b18a0.firebaseapp.com",
    projectId: "fastresponse-b18a0",
    storageBucket: "fastresponse-b18a0.firebasestorage.app",
    messagingSenderId: "1094379140401",
    appId: "1:1094379140401:web:ec4b40a439c6a727daac10",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


document
    .getElementById("incidentForm")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        const ubicacion = document.getElementById("ubicacion").value;
        const descripcion = document.getElementById("descripcion").value;
        const mediaFile = document.getElementById("media").files[0];

        try {
            const docData = {
                ubicacion: ubicacion,
                descripcion: descripcion,
                timestamp: new Date(),
            };

            if (mediaFile) {
                const storageRef = ref(
                    storage,
                    `incident_media/${mediaFile.name}`
                );
                await uploadBytes(storageRef, mediaFile);
                const mediaUrl = `gs://${storage.bucket.name}/incident_media/${mediaFile.name}`;

                docData.mediaUrl = mediaUrl;
            }

            const docRef = await addDoc(collection(db, "incidents"), docData);
            console.log("Reporte enviado correctamente con ID:", docRef.id);
            alert("Reporte enviado correctamente");

            fetch("http://localhost:3000/send-notification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: "Posible caso de crimen detectado",
                    title: "ALERTA",
                    url: "https://www.google.com/maps/@-16.3948183,-71.5414069,16z",
                    urlTitle: "Location",
                }),
            })
                .then((response) => response.text())
                .then((data) => console.log(data))
                .catch((error) => console.error("Error:", error));

            document.getElementById("incidentForm").reset();
        } catch (error) {
            console.error("Error al enviar el reporte:", error);
            alert("Hubo un error al enviar el reporte. Intenta nuevamente.");
        }
    });

