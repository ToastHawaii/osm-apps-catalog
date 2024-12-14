# Community Contribution Score (Beta)

The Community Contribution Score is a rating developed specifically for this app catalog.  
It highlights apps that contribute to the OpenStreetMap community.

To achieve a good rating, an app should be:

- open source,
- capable of displaying and editing the map,
- accessible to many people,
- and well-documented.

## Specification

The Community Contribution Score ranges from **A** to **E**, where **A** is the best rating and **E** is the worst.

### Evaluation Areas

The score is composed of four main categories.

---

#### 1. OSM Contribution (max. 4 points)

**Contributions to the map:**

- +2 points if the app supports contributions (editing, analyzing, etc.) to OpenStreetMap.

**Adding and Editing:**

- +1 point if adding, editing, or deleting POIs, ways, etc., is possible.

**Displaying map data:**

- +1 point if the app displays maps or OSM data.

---

#### 2. Development Involvement (max. 3 points)

**Open Source:**

- +0.5 points if the app is open source.
- An additional +0.5 points if the license is a copyleft license (e.g., GPL, ODbL, MPL, CC).

**Source Code:**

- +0.5 points if a reference to the source code is documented.

**Issue Tracker:**

- +0.5 points if an issue tracker exists.

**Last Update:**

- +0.25 points if the last update occurred within the last year.
- An additional +0.25 points if the last update occurred within the last 3 months.

**Translatability:**

- +0.5 points if contributions to translations are possible.

---

#### 3. Availability and Accessibility (max. 2 points)

**Translations:**

- +0.125 points if the app supports multiple languages (min. 3 languages).
- An additional +0.125 points if the app is available in at least 10 languages.

**Free of Charge:**

- +0.25 points if the app is free of charge.

**Availability on Multiple Platforms:**

- +0.25 points if the app is available on multiple platforms (e.g. Web, Android, iOS).
- An additional +0.25 points if the app is accessible via open-source stores (e.g. F-Droid).

**Global Coverage:**

- +0.5 points if the app covers worldwide map data.

**Accessibility:**

- +0.5 points if accessibility is supported (e.g. screen reader compatibility).

---

#### 4. Community Channels & Documentation (max. 1 point)

**Community Channels:**

- +0.5 points if a communication channel for the community exists (e.g. forum, Mastodon).
- An additional +0.25 points if a channel is hosted on open-source platforms (e.g. Matrix).

**Documentation:**

- +0.125 points if a documentation link is available.
- +0.125 points if the app is documented on multiple platforms (e.g. OSM-Wiki, taginfo, Wikidata).

---

### Restrictions

Apps that are neither open source nor support editing map data can achieve a maximum rating of **C**.  
This ensures that the score prioritizes apps that actively contribute to the OpenStreetMap community.

### Summary of Points Distribution

| Category                               | Max. Points |
| -------------------------------------- | ----------- |
| **OSM Contribution**                   | 4           |
| **Development Involvement**            | 3           |
| **Availability and Accessibility**     | 2           |
| **Community Channels & Documentation** | 1           |
| **Total**                              | **10**          |

### Calculation

The score is calculated by adding up points from all categories. The resulting score places the app into one of the five rating levels (A to E):

- **A**: Score ≥ 8
- **B**: Score ≥ 6
- **C**: Score ≥ 4
- **D**: Score ≥ 2
- **E**: Score < 2

## Discussion

If you have suggestions on how the calculation of the score should be adjusted, you can discuss them [here](https://github.com/ToastHawaii/osm-apps-catalog/discussions/123).
