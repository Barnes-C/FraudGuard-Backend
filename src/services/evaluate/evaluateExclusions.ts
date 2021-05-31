import { AdsSchema } from '../../api/models';

/**
 * Funktion zur Anwendung des Regelwerkes
 * Die Anzeige wird auf einzelen Merkmale geprüft, die als Auschlusskriterium gelten
 * Sie diese erfüllt wird der Score auf -100 gesetzt
 * @param {AdsSchema} resultingAd - Ergebnisobjekt, welches eingegeben wird um die Referenzen setzen zu können
 * @return {number} Gibt zurück, ob eine Auschlusskriterium erfüllt ist
 */
export const evaluateExclusions = async (resultingAd: AdsSchema) => {
  let ausschlusskriterium_erfuellt = 0;

  if (resultingAd.ap_titel_enthaelt_gebraucht === 1) {
    ausschlusskriterium_erfuellt = 1;
  }
  if (resultingAd.ap_titel_enthaelt_suche === 1) {
    ausschlusskriterium_erfuellt = 1;
  }
  if (resultingAd.ap_titel_enthaelt_tausche === 1) {
    ausschlusskriterium_erfuellt = 1;
  }
  if (resultingAd.ap_titel_enthaelt_kilo === 1) {
    ausschlusskriterium_erfuellt = 1;
  }
  if (resultingAd.ap_titel_enthaelt_sammlung === 1) {
    ausschlusskriterium_erfuellt = 1;
  }

  if (resultingAd.ap_beschreibung_enthaelt_tausch === 1) {
    ausschlusskriterium_erfuellt = 1;
  }
  if (resultingAd.ap_beschreibung_enthaelt_suche === 1) {
    ausschlusskriterium_erfuellt = 1;
  }

  if (resultingAd.ap_preis_ist_leer === 1) {
    ausschlusskriterium_erfuellt = 1;
  }

  if (resultingAd.ap_sonstiges_anzeige_suche === 1) {
    ausschlusskriterium_erfuellt = 1;
  }

  if (
    resultingAd.ap_sonstiges_anzeige_nur_abholung === 1 &&
    resultingAd.ap_beschreibung_enthaelt_barzahlung === 1 &&
    resultingAd.beschreibung_enthaelt_ueberweisung === 0 &&
    resultingAd.beschreibung_enthaelt_sepa === 0
  ) {
    ausschlusskriterium_erfuellt = 1;
  }

  return ausschlusskriterium_erfuellt;
};
