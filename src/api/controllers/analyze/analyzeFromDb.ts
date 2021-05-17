import { analyze } from '../../../services/analyze';
import { findByIdEbay } from '../../../services/mongo';
import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';

export const analyzeFromDb = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // funktionerweise gleich wie const ad = await findByIdEbay(id);
    findByIdEbay(id).then((ad) => {
      if (!ad) {
        res.status(HttpStatus.NOT_FOUND).json({
          msg: 'ad not found',
        });
        return;
      }

      analyze(ad)
        .then((result) => {
          res.status(HttpStatus.OK).json(result);
        })
        .catch((error) => {
          logger.error(error);
          res.status(HttpStatus.INTERNAL_ERROR).json({
            msg: 'Internal Error',
            error,
          });
        });
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_ERROR).json({ error: err });
    logger.error(err);
  }
};
