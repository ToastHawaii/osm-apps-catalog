# Community Contribution Score (Beta)

Der Community Contribution Score ist ein für diesen App-Katalog entwickelte Bewertung.
Er ermöglicht es, diejenigen Apps hervorzuheben, welche zur OpenStreetMap Gemeinschaft beitragen.
Zu einer guten Bewertung führt
- eine offene Software,
- die das Anzeigen und Bearbeiten der Karte ermöglicht,
- für viele Menschen zugänglich,
- und gut dokumentiert ist.

Hier ist eine mögliche Fortsetzung in Markdown mit der Spezifikation des Community Contribution Score:  

## Spezifikation

Der Community Contribution Score reicht von **A** bis **E**, wobei die Einordnung wie folgt definiert ist:  
- **A**: 8 Punkte oder mehr  
- **B**: 6 bis 7,99 Punkte  
- **C**: 4 bis 5,99 Punkte  
- **D**: 2 bis 3,99 Punkte  
- **E**: Weniger als 2 Punkte  

Apps, die weder Open Source sind noch das Bearbeiten von Kartendaten unterstützen, können **keine höhere Bewertung als C** erreichen.

### Kriterien und Punktevergabe

Der Score setzt sich aus drei Hauptkategorien zusammen:

### 1. **OSM-Teilnahme** (max. 4 Punkte)  
Diese Kategorie bewertet, wie gut eine App die Nutzung und Bearbeitung von OpenStreetMap-Daten unterstützt:  
- **Bearbeiten von OSM-Daten** (2 Punkte): Die App ermöglicht die Bearbeitung von OSM-Daten.  
- **Hinzufügen und Bearbeiten** (1 Punkt): Die App erlaubt sowohl das Hinzufügen als auch das Bearbeiten von Daten (z. B. POIs, Geometrien, Relationen oder Tags).  
- **Anzeigen von OSM-Daten** (1 Punkt): Die App bietet Funktionen zum Anzeigen von Karten oder anderen OSM-Daten.

### 2. **Entwicklungsbeteiligung** (max. 3 Punkte)  
Diese Kategorie bewertet, wie offen die Entwicklung der App gestaltet ist:  
- **Open Source** (0,5 Punkte): Die App ist quelloffen.  
- **Starke Open-Source-Lizenz** (0,5 Punkte): Wenn die App unter einer Copyleft-Lizenz (z. B. GPL, ODbL) steht.  
- **Quellcode verfügbar** (0,5 Punkte): Der Quellcode der App ist öffentlich zugänglich.  
- **Issue Tracker** (0,5 Punkte): Ein öffentlich zugängliches System zur Fehlerberichterstattung und Funktionsanforderungen ist vorhanden.  
- **Regelmässige Updates** (max. 0,5 Punkte):  
  - 0,25 Punkte: Letztes Update innerhalb der letzten 12 Monate.  
  - 0,25 Punkte: Letztes Update innerhalb der letzten 3 Monate.  
- **Übersetzbarkeit** (0,5 Punkte): Die App unterstützt Übersetzungen durch eine Plattform oder Datei.

### 3. **Dokumentation/Hilfe/Verfügbarkeit/Barrierefreiheit** (max. 3 Punkte)  
Diese Kategorie bewertet die Zugänglichkeit und Unterstützung der App:  
- **Community-Kanäle** (max. 0,5 Punkte):  
  - 0,25 Punkte: Die App verfügt über mindestens einen Community-Kommunikationskanal.  
  - 0,25 Punkte: Dieser Kanal befindet sich auf einer Open-Source-Plattform (z. B. IRC, Matrix).  
- **Mehrsprachigkeit** (max. 0,5 Punkte):  
  - 0,25 Punkte: Übersetzungen in mindestens 3 Sprachen verfügbar.  
  - 0,25 Punkte: Übersetzungen in mindestens 10 Sprachen verfügbar.  
- **Gratis-Nutzung** (0,25 Punkte): Die App ist kostenlos nutzbar.  
- **Mehrere Plattformen** (0,25 Punkte): Verfügbar auf mehreren Plattformen oder über eine freie Store-Option (z. B. F-Droid).  
- **Dokumentation** (max. 0,25 Punkte):  
  - 0,125 Punkte: Eine Dokumentationsquelle ist verfügbar.  
  - 0,125 Punkte: Die App ist auf mehreren Plattformen dokumentiert.  
- **Weltweite Abdeckung** (0,5 Punkte): Die App bietet eine globale Abdeckung.  
- **Barrierefreiheit** (0,5 Punkte): Die App bietet spezifische Funktionen zur Verbesserung der Barrierefreiheit.

### Einschränkungen  
Eine App, die weder Open Source ist noch das Bearbeiten von Karten unterstützt, kann maximal 5 Punkte erreichen (Bewertung C). Dies soll sicherstellen, dass der Score Apps bevorzugt, die aktiv zur OpenStreetMap-Community beitragen.

### Zusammenfassung der Punkteverteilung
| Kategorie                     | Max. Punkte |
|-------------------------------|-------------|
| **OSM-Teilnahme**             | 4           |
| **Entwicklungsbeteiligung**   | 3           |
| **Dokumentation und Zugang**  | 3           |
| **Gesamt**                    | 10          |

Apps mit einem hohen Community Contribution Score zeichnen sich dadurch aus, dass sie aktiv die OpenStreetMap-Gemeinschaft unterstützen und für eine breite Nutzerbasis zugänglich sind.
