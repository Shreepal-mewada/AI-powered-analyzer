import { ResearchBrief } from '../models/ResearchBrief.js';

export const getBriefById = async (req, res) => {
  try {
    const brief = await ResearchBrief.findOne({ runId: req.params.id }) || await ResearchBrief.findById(req.params.id);
    if (!brief) return res.status(404).json({ error: 'Research Brief not found.' });
    res.json(brief);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBriefs = async (req, res) => {
  try {
    const briefs = await ResearchBrief.find().sort({ createdAt: -1 });
    res.json(briefs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
