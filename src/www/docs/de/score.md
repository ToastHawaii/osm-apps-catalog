# Community Contribution Score (Beta)

Der Community Contribution Score ist ein für diesen App-Katalog entwickelte Bewertung.
Er ermöglicht es, diejenigen Apps hervorzuheben, welche zur OpenStreetMap-Gemeinschaft beitragen.
Zu einer guten Bewertung führt

- eine offene Software,
- die das Anzeigen und Bearbeiten der Karte ermöglicht,
- für viele Menschen zugänglich,
- und gut dokumentiert ist.

## Spezifikation

Der Community Contribution Score reicht von **A** bis **E**, wobei **A** die beste Bewertung und **E** die schlechteste ist.

### Bewertungsbereiche

Der Score setzt sich aus vier Hauptbereichen zusammen.

---

#### 1. OSM-Beteiligung (max. 4 Punkte)

**Beiträge zur Karte:**

- +2 Punkte, wenn die App Beiträge (Bearbeiten, Analysieren, etc.) zu OpenStreetMap unterstützt.

**Hinzufügen und Bearbeiten:**

- +1 Punkt, wenn sowohl das Hinzufügen als auch das Bearbeiten oder Löschen von POIs, Wegen etc. möglich ist.

**Anzeigen von Kartendaten:**

- +1 Punkt, wenn die App Karten- oder OSM-Daten anzeigt.

---

#### 2. Entwicklungsbeteiligung (max. 3 Punkte)

**Open Source:**

- +0,5 Punkte, wenn die App Open Source ist.
- Zusätzliche +0,5 Punkte, wenn die Lizenz eine Copyleft-Lizenz ist (z.B. GPL, ODbL, MPL, CC).

**Quellcode:**

- +0,5 Punkte, wenn ein Verweis zum Quellcode dokumentiert ist.

**Issue-Tracker:**

- +0,5 Punkte, wenn ein Issue-Tracker existiert.

**Letztes Update:**

- +0,25 Punkte, wenn das letzte Update innerhalb des letzten Jahres stattfand.
- Zusätzliche +0,25 Punkte, wenn das letzte Update innerhalb der letzten 3 Monate stattfand.

**Übersetzbarkeit:**

- +0,5 Punkte, wenn zur Übersetzung beigetragen werden kann.

---

#### 3. Verfügbarkeit und Zugänglichkeit (max. 2 Punkte)

**Übersetzungen:**

- +0,125 Punkte, wenn die App Mehrsprachigkeit (.min 3 Sprachen) unterstützt.
- Zusätzliche +0,125 Punkte, wenn die App in mindestens 10 Sprachen verfügbar ist.

**Gratis:**

- +0,25 Punkte, wenn die App kostenlos ist.

**Verfügbarkeit auf mehreren Plattformen:**

- +0,25 Punkte, wenn die App auf mehreren Plattformen (z.B. Web, Android, iOS) verfügbar ist.
- Zusätzliche +0,25 Punkte, wenn die App über freie Stores (z.B. F-Droid) zugänglich ist.

**Weltweite Abdeckung:**

- +0,5 Punkte, wenn die App weltweite Kartendaten abdeckt.

**Barrierefreiheit:**

- +0,5 Punkte, wenn Barrierefreiheit unterstützt wird (z.B. Screenreader-Kompatibilität).

---

#### 4. Community-Kanäle & Dokumentation (max. 1 Punkt)

**Community-Kanäle:**

- +0,5 Punkte, wenn ein Kommunikationskanal für die Community existiert (z.B. Forum, Mastodon).
- Zusätzliche +0,25 Punkte, wenn ein Kanal auf Open-Source-Medien (z.B. Matrix) betrieben wird.

**Dokumentation:**

- +0,125 Punkte, wenn ein Dokumentationslink verfügbar ist.
- +0,125 Punkte, wenn die App auf mehreren Plattformen dokumentiert ist (z.B. OSM-Wiki, taginfo, Wikidata).

---

### Einschränkungen

Apps, die weder Open-Source sind noch das Bearbeiten von Kartendaten unterstützen, können maximal die Bewertung **C** erreichen. Dies soll sicherstellen, dass der Score Apps bevorzugt, die aktiv zur OpenStreetMap-Community beitragen.

### Zusammenfassung der Punkteverteilung

| Kategorie                            | Max. Punkte |
| ------------------------------------ | ----------- |
| **OSM-Beteiligung**                  | 4           |
| **Entwicklungsbeteiligung**          | 3           |
| **Verfügbarkeit und Zugänglichkeit** | 2           |
| **Community-Kanäle & Dokumentation** | 1           |
| **Gesamt**                           | **10**      |

### Berechnung

Der Score wird durch das Addieren der Punkte aus allen Kategorien berechnet. Die resultierende Punktzahl ordnet die App in eine der fünf Bewertungsstufen ein (A bis E):

- **A**: Score ≥ 8
- **B**: Score ≥ 6
- **C**: Score ≥ 4
- **D**: Score ≥ 2
- **E**: Score < 2

## Diskussion

Wenn Sie Vorschläge haben, wie die Berechnung der Punktzahl angepasst werden sollte, können Sie diese [hier](https://github.com/ToastHawaii/osm-apps-catalog/discussions/123) diskutieren.
