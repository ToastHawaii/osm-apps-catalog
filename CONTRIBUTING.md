
# Contributing guidelines

[![GitHub license](https://img.shields.io/badge/license-AGPLv3-%23a32d2a.svg)](https://github.com/ToastHawaii/osm-apps-catalog/blob/main/LICENSE)  <a href="https://hosted.weblate.org/engage/osm-apps-catalog/"><img src="https://hosted.weblate.org/widget/osm-apps-catalog/svg-badge.svg" alt="Translation status" /></a> [![Dependencies](https://img.shields.io/badge/dependencies-explore-orange?link=https%3A%2F%2Fnpmgraph.js.org%2F%3Fq%3Dhttps%253A%252F%252Fgithub.com%252FToastHawaii%252Fosm-apps-catalog%252Fblob%252Fmain%252Fpackage.json%23color%3Doutdated%26zoom%3Dw%26sizing%3D)](https://npmgraph.js.org/?q=https%3A%2F%2Fgithub.com%2FToastHawaii%2Fosm-apps-catalog%2Fblob%2Fmain%2Fpackage.json#color=outdated&zoom=w&sizing=)

[![Collect osm apps](https://github.com/ToastHawaii/osm-apps-catalog/actions/workflows/collect-osm-apps.yml/badge.svg)](https://github.com/ToastHawaii/osm-apps-catalog/actions/workflows/collect-osm-apps.yml) [![Collect osm apps translations](https://github.com/ToastHawaii/osm-apps-catalog/actions/workflows/collect-osm-apps-translations.yml/badge.svg)](https://github.com/ToastHawaii/osm-apps-catalog/actions/workflows/collect-osm-apps-translations.yml)

Thank you for your interest in contributing to the OSM Apps Catalog.

- One easy way to support is **give the project a ⭐**.
- The OSM App Catalog isn't nearly as well-known as it should be. **Help spread the word.** For example, share it on social media, write a blog post, or talk to others about it.
- **Add OSM apps** you know to the Catalog or improve some from [the list of apps that need to be documented](https://github.com/ToastHawaii/osm-apps-catalog/issues/282). Find out how to document new apps in the [OpenStreetMap Wiki about the OSM Apps Catalog](https://wiki.openstreetmap.org/wiki/OSM_Apps_Catalog).

## Translations

### OSM Apps Catalog user interface
In [Weblate](https://hosted.weblate.org/projects/osm-apps-catalog), you can translate the texts that appear in the catalog’s interface. 

Feel free to [add new languages](https://hosted.weblate.org/new-lang/osm-apps-catalog/). I'll be happy to integrate them.

Enhance an existing translation by rephrasing it or fixing errors. Strings in OSM Apps Catalog Interface are not carved in stone. Even the original English ones are debatable. If you think the phrasing is misleading or just confusing you are welcome to provide a better text directly in weblate.

Follow this [link to improve the translations from the user interface](https://hosted.weblate.org/projects/osm-apps-catalog).

### Meta data / descriptions from the apps
The texts relating to the apps descriptions come from the [OpenStreetMap Wiki](https://wiki.openstreetmap.org/wiki/Wiki_Translation), [Wikidata](https://www.wikidata.org/wiki/Wikidata:Introduction) and other sources. These should be translated directly in the wikis. 

You can find the sources by going to the detail view of an app in the OSM Apps Catalog and click on "Edit / Update Information" in the "Get involved" section.

### Issues
[Report bugs](https://github.com/ToastHawaii/osm-apps-catalog/issues/new?template=bug_report.md), [discuss ideas](https://github.com/ToastHawaii/osm-apps-catalog/issues?q=is%3Aissue%20state%3Aopen%20label%3Aenhancement) and [propose features](https://github.com/ToastHawaii/osm-apps-catalog/issues/new?template=feature_request.md) for the OSM Apps Catalog.

You can [upvote features](https://github.com/ToastHawaii/osm-apps-catalog/issues) you would like to see.

## Code
AI docs here: [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ToastHawaii/osm-apps-catalog) *(Not everything is correct. But it’s a good starting point if you don’t want to dive straight into the code.)*

### Run locally
```bash
git clone https://github.com/ToastHawaii/osm-apps-catalog.git
cd osm-apps-catalog
npm install
npm run app:start          # starts the local dev server 
```

Or test meta data collect actions:

```bash
npm run actions:collect-osm-apps:start              # all app meta data  
npm run actions:collect-osm-apps-translations:start # all app meta data translation
```
