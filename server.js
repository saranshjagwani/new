import express from "express";
import cors from "cors";
import { db } from "./firebase.js";

const app = express();
app.use(cors());
app.use(express.json());

// GET doctors by specialization
app.get("/doctors", async (req, res) => {
  try {
    const { specialization } = req.query;

    let doctorsRef = db.collection("doctors");
    let snapshot;

    if (specialization) {
      snapshot = await doctorsRef.where("specialization", "==", specialization).get();
    } else {
      snapshot = await doctorsRef.get();
    }

    if (snapshot.empty) {
      return res.json([]);
    }

    const doctors = snapshot.docs.map(doc => doc.data());
    res.json(doctors);

  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Error fetching doctors" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
