import { Router } from 'express';
import { ExplanationPDFService } from '../services/explanation-pdf.service.js';

const router = Router();
const explanationService = new ExplanationPDFService();

// POST /api/explanation/generate - Generate explanation report
router.post('/generate', async (req, res) => {
  try {
    const { campaignInput, generatedPage, designDecisions } = req.body;
    
    if (!campaignInput) {
      return res.status(400).json({ error: 'campaignInput is required' });
    }
    
    const report = await explanationService.generateExplanationReport(
      campaignInput,
      generatedPage || {},
      designDecisions || []
    );
    
    res.json({
      success: true,
      report,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate explanation report',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/explanation/pdf - Generate PDF from explanation report
router.post('/pdf', async (req, res) => {
  try {
    const { report } = req.body;
    
    if (!report) {
      return res.status(400).json({ error: 'report is required' });
    }
    
    const pdfBuffer = await explanationService.generatePDF(report);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="explanation-${Date.now()}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate PDF',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;

