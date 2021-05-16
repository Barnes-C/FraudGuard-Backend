import { AdsSchema } from '../../api/models';
import { logger } from '../../shared';

export const evaluateAntipattern = async (resultingAd: AdsSchema) => {
  logger.info('evaluate Antipattern');

  resultingAd.antipattern_score = 0;
  resultingAd.antipattern_gesamtscore = 0;
  resultingAd.antipattern_anzahl_zutreffend = 0;
  resultingAd.antipattern_anzahl_gesamt = 0;

  // BEISPIEL

  // wenn pattern zutrifft -> bedingung wahr

  // addToScore(resultingAd immer eingeben, bedingung wann addiert werden soll, score)
  /* addToScore(
    resultingAd,
    resultingAd.ap_beschreibung_enthaelt_barzahlung === 1,
    5,
  ); */
  // gleich wie
  // if (resultingAd.ap_beschreibung_enthaelt_barzahlung === 1) {
  //     addToScore(resultingAd, false, 5)
  // }else{
  //     addToScore(resultingAd, false, 5)
  // }

  // wenn höhere Werte möglich sind
  // if(resultingAd.konto_bewertung >5){
  //     addToScore(resultingAd, true, 5)
  // }else if(resultingAd.konto_bewertung >3){
  //     addToScore(resultingAd, true, 4)
  // }else if(resultingAd.konto_bewertung >1){
  //     addToScore(resultingAd, true, 1)
  // }else if(resultingAd.konto_bewertung >2){
  //     addToScore(resultingAd, false, 1)
  // }

  // BEISPIEL ENDE

  // Michelle

  // Titel
  addToScore(resultingAd, resultingAd.ap_titel_enthaelt_gebraucht === 1, 5);

  addToScore(resultingAd, resultingAd.ap_titel_enthaelt_suche === 1, 5);

  addToScore(resultingAd, resultingAd.ap_titel_enthaelt_tausche === 1, 5);

  addToScore(resultingAd, resultingAd.ap_titel_enthaelt_kilo === 1, 3);

  addToScore(resultingAd, resultingAd.ap_titel_enthaelt_sammlung === 1, 4);

  // Beschreibung
  addToScore(
    resultingAd,
    resultingAd.ap_beschreibung_enthaelt_barzahlung === 1,
    5,
  );

  addToScore(
    resultingAd,
    resultingAd.ap_beschreibung_enthaelt_gebraucht === 1,
    5,
  );

  addToScore(resultingAd, resultingAd.ap_beschreibung_enthaelt_tausch === 1, 5);

  addToScore(
    resultingAd,
    resultingAd.ap_beschreibung_enthaelt_abholung === 1,
    1,
  );

  addToScore(
    resultingAd,
    resultingAd.ap_beschreibung_enthaelt_sammleraufloesung === 1,
    4,
  );

  addToScore(resultingAd, resultingAd.ap_beschreibung_enthaelt_kilo === 1, 3);

  addToScore(resultingAd, resultingAd.ap_beschreibung_enthaelt_suche === 1, 5);

  // Konto
  addToScore(resultingAd, resultingAd.ap_konto_name_natuerlich === 1, 2);

  if (
    resultingAd.konto_anzeigen_anzahl > 0 &&
    resultingAd.konto_anzeigen_ueber_100 === 0
  )
    addToScore(resultingAd, true, 3);
 else addToScore(resultingAd,false,3,);
  // addToScore(resultingAd, resultingAd.weitere_anzeigen_gebraucht)

  // Jessi
  // Score Kategorie Preis
  addToScore(resultingAd, resultingAd.ap_preis_ist_leer === 1, 5);

  // Score Kategorie Sonstiges
  addToScore(resultingAd, resultingAd.ap_sonstiges_anzeige_zeit_tag === 1, 5);

  addToScore(resultingAd, resultingAd.ap_sonstiges_anzeige_suche === 1, 5);

  addToScore(
    resultingAd,
    resultingAd.ap_sonstiges_anzeige_nur_abholung === 1,
    4,
  );

  // Score Kombinationen
  if (
    resultingAd.ap_sonstiges_anzeige_nur_abholung === 1 &&
    resultingAd.ap_beschreibung_enthaelt_barzahlung === 1
  )
    addToScore(resultingAd, true, 4);
  else addToScore(resultingAd,false,4,);  

  return resultingAd;
};

const addToScore = (
  resultingAd: AdsSchema,
  condition: boolean,
  score: number,
): void => {
  if (score < 1 || score > 5) {
    throw new Error('Score not in Range');
  }

  if (condition) {
    resultingAd.antipattern_score += score;
    resultingAd.antipattern_anzahl_zutreffend += 1;
  }
  resultingAd.antipattern_gesamtscore += score;
  resultingAd.antipattern_anzahl_gesamt += 1;
};
