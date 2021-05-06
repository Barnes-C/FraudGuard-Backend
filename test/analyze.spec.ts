import { AdsModel } from './../src/api/models/ads';
/* eslint-disable no-unused-vars */
import {
  // analyze,
  // analyzeBeschreibung,
  // analyzeKonto,
  analyzeMetadaten,
  analyzePreis,
  analyzeSonstiges,
  analyzeTitel,
} from '../src/services/analyze';
import { afterAll, beforeAll, describe, test } from '@jest/globals';
import { createTestserver } from './testserver';
import { expect } from 'chai';
import { Ad1, Ad2, Ad3 } from './testAds';
import type { Server } from 'http';

let server: Server;

// Test-Suite
describe('Analyze Ads', () => {
  beforeAll(async () => {
    server = await createTestserver();
  });

  afterAll(() => {
    server.close();
  });

  test('Analyze titel', async () => {

    // Titel - keine Merkmale enthalten
    const result1 = await analyzeTitel(Ad1, new AdsModel());

    // Titel Merkmale
    expect(result1.titel_enthaelt_neu).to.be.equal(0);
    expect(result1.titel_enthaelt_ovp).to.be.equal(0);
    expect(result1.titel_enthaelt_verschweißt).to.be.equal(0);
    expect(result1.titel_enthaelt_ungeoeffnet).to.be.equal(0);
    expect(result1.titel_enthaelt_zeichen).to.be.equal(0);
    expect(result1.ap_titel_enthaelt_gebraucht).to.be.equal(0);

    // Titel Antipattern
    expect(result1.ap_titel_enthaelt_suche).to.be.equal(0);
    expect(result1.ap_titel_enthaelt_tausche).to.be.equal(0);
    expect(result1.ap_titel_enthaelt_sammlung).to.be.equal(0);
    expect(result1.ap_titel_enthaelt_kilo).to.be.equal(0);

    // Titel - Betrugsmerkmale enthalten
    const result2 = await analyzeTitel(Ad2, new AdsModel());

    // Titel Merkmale
    expect(result2.titel_enthaelt_neu).to.be.equal(1);
    expect(result2.titel_enthaelt_ovp).to.be.equal(1);
    expect(result2.titel_enthaelt_verschweißt).to.be.equal(1);
    expect(result2.titel_enthaelt_ungeoeffnet).to.be.equal(1);
    expect(result2.titel_enthaelt_zeichen).to.be.equal(1);

    // Titel Anitpattern
    expect(result2.ap_titel_enthaelt_gebraucht).to.be.equal(0);
    expect(result2.ap_titel_enthaelt_suche).to.be.equal(0);
    expect(result2.ap_titel_enthaelt_tausche).to.be.equal(0);
    expect(result2.ap_titel_enthaelt_sammlung).to.be.equal(0);
    expect(result2.ap_titel_enthaelt_kilo).to.be.equal(0);

    // Titel - Antipattern enthalten
    const result3 = await analyzeTitel(Ad3, new AdsModel());

    // Titel Merkmale
    expect(result3.titel_enthaelt_neu).to.be.equal(0);
    expect(result3.titel_enthaelt_ovp).to.be.equal(0);
    expect(result3.titel_enthaelt_verschweißt).to.be.equal(0);
    expect(result3.titel_enthaelt_ungeoeffnet).to.be.equal(0);
    expect(result3.titel_enthaelt_zeichen).to.be.equal(0);

    // Titel - Anitpattern
    expect(result3.ap_titel_enthaelt_gebraucht).to.be.equal(1);
    expect(result3.ap_titel_enthaelt_suche).to.be.equal(1);
    expect(result3.ap_titel_enthaelt_tausche).to.be.equal(1);
    expect(result3.ap_titel_enthaelt_sammlung).to.be.equal(1);
    expect(result3.ap_titel_enthaelt_kilo).to.be.equal(1);
  });

  test('Analyze description', async () => {
    const result1 = await analyzeTitel(Ad1, new AdsModel());
    const result2 = await analyzeTitel(Ad2, new AdsModel());

    expect(result1.beschreibung_enthaelt_ueberweisung).to.be.equal(0);
    expect(result1.beschreibung_enthaelt_versand).to.be.equal(1);
    expect(result1.beschreibung_enthaelt_neu).to.be.equal(0);
    expect(result1.beschreibung_enthaelt_ovp).to.be.equal(0);
    expect(result1.beschreibung_enthaelt_versiegelt).to.be.equal(0);
    expect(result1.beschreibung_enthaelt_whatsapp).to.be.equal(0);
    expect(result1.beschreibung_ist_kopiert_anzeige).to.be.equal(0);
    expect(result1.beschreibung_ist_kopiert_unternehmen).to.be.equal(0);
    expect(result1.ap_beschreibung_enthaelt_barzahlung).to.be.equal(0);
    expect(result1.ap_beschreibung_enthaelt_gebraucht).to.be.equal(1);
    expect(result1.ap_beschreibung_enthaelt_tausch).to.be.equal(0);
    expect(result1.ap_beschreibung_enthaelt_abholung).to.be.equal(1);
    expect(result1.ap_beschreibung_enthaelt_suche).to.be.equal(0);
    expect(result1.ap_beschreibung_enthaelt_sammleraufloesung).to.be.equal(1);
    expect(result1.ap_beschreibung_enthaelt_kilo).to.be.equal(0);

    expect(result2.beschreibung_enthaelt_ueberweisung).to.be.equal(1);
    expect(result2.beschreibung_enthaelt_versand).to.be.equal(0);
    expect(result2.beschreibung_enthaelt_neu).to.be.equal(0);
    expect(result2.beschreibung_enthaelt_ovp).to.be.equal(1);
    expect(result2.beschreibung_enthaelt_versiegelt).to.be.equal(1);
    expect(result2.beschreibung_enthaelt_whatsapp).to.be.equal(1);
    expect(result2.beschreibung_ist_kopiert_anzeige).to.be.equal(0);
    expect(result2.beschreibung_ist_kopiert_unternehmen).to.be.equal(1);
    expect(result2.ap_beschreibung_enthaelt_barzahlung).to.be.equal(0);
    expect(result2.ap_beschreibung_enthaelt_gebraucht).to.be.equal(0);
    expect(result2.ap_beschreibung_enthaelt_tausch).to.be.equal(0);
    expect(result2.ap_beschreibung_enthaelt_abholung).to.be.equal(0);
    expect(result2.ap_beschreibung_enthaelt_suche).to.be.equal(0);
    expect(result2.ap_beschreibung_enthaelt_sammleraufloesung).to.be.equal(0);
    expect(result2.ap_beschreibung_enthaelt_kilo).to.be.equal(0);
  });

  test('Analyze account', async () => {});

  test('Analyze price', async () => {
    const result1 = await analyzePreis(Ad1, new AdsModel());
    const result2 = await analyzePreis(Ad2, new AdsModel());

    // keine Merkmale enthalten
    expect(result1.preis_unter_marktwert).to.be.equal(0);
    expect(result1.preis_abweichung_marktwert).to.be.equal(0);
    expect(result1.preis_waehrung_eur).to.be.equal(0);
    expect(result1.preis_typ_vb).to.be.equal(0);
    expect(result1.ap_preis_ist_leer).to.be.equal(0);

    // Merkmale enthalten
    expect(result2.preis_unter_marktwert).to.be.equal(1);
    expect(result1.preis_abweichung_marktwert).to.be.equal(0.5);
    expect(result1.preis_waehrung_eur).to.be.equal(1);
    expect(result1.preis_typ_vb).to.be.equal(1);
    expect(result1.ap_preis_ist_leer).to.be.equal(0);
  });

  test('Analyze metadata', async () => {
    const result1 = await analyzeMetadaten(Ad1, new AdsModel());
    const result2 = await analyzeMetadaten(Ad2, new AdsModel());

    expect(result1.metadata_category).to.be.equal(Ad1.category.id);
    expect(result1.metadata_amount_pictures).to.be.equal(6);
    expect(result1.metadata_phone).to.be.equal(1);
    expect(result1.metadata_startDateTime).to.be.equal(1614434831000);

    expect(result2.metadata_category).to.be.equal(Ad1.category.id);
    expect(result2.metadata_amount_pictures).to.be.equal(6);
    expect(result2.metadata_phone).to.be.equal(1);
    expect(result2.metadata_startDateTime).to.be.equal(1614434831000);
  });

  test('Analyze misc.', async () => {
    const result1 = await analyzeSonstiges(Ad1, new AdsModel());

    expect(result1.sonstiges_anzeige_kopiert).to.be.equal('1');
    expect(result1.ap_sonstiges_anzeige_nur_abholung).to.be.equal('1');
    expect(result1.ap_sonstiges_anzeige_suche).to.be.equal('1');
    expect(result1.ap_sonstiges_anzeige_zeit_tag).to.be.equal('1');
  });

  test('Analyze all', async () => {});
});
