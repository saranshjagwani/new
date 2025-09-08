import express from "express";
import cors from "cors";
import { db } from "./firebase.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/doctors", async (req, res) => {
  try {
    const { specialization } = req.query;
    let doctorsRef = db.collection("doctors");
    let snapshot;

    if (specialization) {
      const normalized = specialization.charAt(0).toUpperCase() + specialization.slice(1).toLowerCase();
      snapshot = await doctorsRef.where("specialization", "==", normalized).get();
    } else {
      snapshot = await doctorsRef.get();
    }

    if (snapshot.empty) return res.json([]);

    const doctors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(doctors);

  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Error fetching doctors" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
