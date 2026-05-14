import React, { ReactNode } from "react";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

import { Button } from "@components/ui/button";
import { App } from "@shared/data/App";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@components/ui/item";
import {
  AmazonIcon,
  AppStoreIcon,
  ArrowDown01Icon,
  BarCode02Icon,
  BlueskyIcon,
  Copy01Icon,
  CustomerService01Icon,
  Edit04Icon,
  Github01Icon,
  GitlabIcon,
  InformationCircleIcon,
  Location05Icon,
  MapsSearchIcon,
  MastodonIcon,
  MatrixIcon,
  MessageMultiple02Icon,
  MicrosoftIcon,
  MountainIcon,
  NeuralNetworkIcon,
  PlayStoreIcon,
  RedditIcon,
  Share03Icon,
  Share05Icon,
  ShoppingBag01Icon,
  SourceCodeIcon,
  StarIcon,
  Tag01Icon,
  TelegramIcon,
  TranslateIcon,
} from "@hugeicons/core-free-icons";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@components/ui/popover";
import { t } from "i18next";
import { languageCodeToDisplay } from "@app/ui/lib/language";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

function Activity(
  props: {
    title: string;
    description: string;
    icon: IconSvgElement;

    hint?: string | undefined;
  } & (
    | {
        link: string | undefined;
      }
    | {
        links: ({
          icon: IconSvgElement;
          title: ReactNode;
          description?: ReactNode;
        } & ({ href: string } | { onClick: () => void }))[];
      }
  ),
) {
  const { title, description, icon } = props;

  const disabled =
    !("link" in props && props.link) &&
    !("links" in props && props.links.length);

  if (!disabled) {
    const item = (
      <>
        <ItemMedia variant="image">
          <HugeiconsIcon icon={icon} strokeWidth={2} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription className="h-10">{description}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <HugeiconsIcon
            icon={"links" in props ? ArrowDown01Icon : Share05Icon}
            className="inline-block"
            strokeWidth={2}
          />
        </ItemActions>
      </>
    );

    if ("link" in props) {
      return (
        <Item size="xs" asChild>
          <a href={props.link} target="_blank" rel="noreferrer">
            {item}
          </a>
        </Item>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Item size="xs" className="">
            {item}
          </Item>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {props.links.map((l, i) => (
            <DropdownMenuItem key={i} asChild>
              <Item size="sm" className="w-full">
                <ItemMedia variant="icon">
                  <HugeiconsIcon
                    icon={l.icon}
                    className="inline-block"
                    strokeWidth={2}
                    size={19.25}
                    style={{ width: 19.25, height: 19.25 }}
                  />
                </ItemMedia>
                <ItemContent className="gap-0">
                  <ItemTitle>{l.title}</ItemTitle>
                  {l.description && (
                    <ItemDescription className="leading-none">
                      {l.description}
                    </ItemDescription>
                  )}
                </ItemContent>
              </Item>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Item variant="muted" size="xs">
            <ItemMedia variant="image" className="opacity-40">
              <HugeiconsIcon
                icon={icon}
                className="inline-block"
                strokeWidth={2}
              />
            </ItemMedia>
            <ItemContent className="opacity-40">
              <ItemTitle>{title}</ItemTitle>
              <ItemDescription>{description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                variant="ghost"
                className="p-1"
                size="xs"
                title={t("app.contribute.hint")}
              >
                <HugeiconsIcon
                  className="size-4"
                  icon={InformationCircleIcon}
                  aria-label={t("app.contribute.hint")}
                />
              </Button>
            </ItemActions>
          </Item>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-60 whitespace-pre-line">
          {props.hint}
        </PopoverContent>
      </Popover>
    );
  }
}

export function Contribute({ app }: { app: App }) {
  // const { t } = useTranslation();

  // const appStores = [
  //   {
  //     link: GooglePlayUrl,
  //     id: app.install.googlePlayID,
  //     icon: PlayStoreIcon,
  //     text: "Google Play",
  //   },
  //   { id: app.install.asin, icon: AmazonIcon, text: "Amazon AppStore" },
  //   {
  //     id: app.install.huaweiAppGalleryID,
  //     icon: ShoppingBag01Icon,
  //     text: "HUAWEI AppGallery",
  //   },
  //   {
  //     id: app.install.appleStoreID || app.install.macAppStoreID,
  //     icon: AppStoreIcon,
  //     text: "Apple AppStore",
  //   },
  //   {
  //     id: app.install.microsoftAppID,
  //     icon: MicrosoftIcon,
  //     text: "Microsoft Store",
  //   },
  // ].filter((s) => s.id);

  // {
  //     bluesky: t("sharing.bluesky.title", "Share on Bluesky"),
  //     reddit: t("sharing.reddit.title", "Share on Reddit"),
  //     fediverse: t("sharing.fediverse.title", "Share on Fediverse"),
  //     mastodon: t("sharing.mastodon.title", "Share on Mastodon"),
  //     telegram: t("sharing.telegram.title", "Share via Telegram"),

  //     "copy-url": t("sharing.copy-url.title", "Copy URL to clipboard"),
  //   }

  return (
    <div className="-mx-4 grid sm:grid-cols-2">
      <ItemGroup>
        <span className="px-4 font-medium text-muted-foreground">
          Community
        </span>
        {
          <Activity
            title="Rate and review"
            description={`Rate and / or review ${app.name} in the app stores`}
            icon={StarIcon}
            hint={"No AppStore with review is documented."}
            links={[
              {
                icon: PlayStoreIcon,
                title: "Rate on Google Play",
                href: "",
              },
              {
                icon: AppStoreIcon,
                title: "Rate on Apple AppStore",
                href: "",
              },
              {
                icon: ShoppingBag01Icon,
                title: "Rate on HUAWEI AppGallery",
                href: "",
              },
              {
                icon: AmazonIcon,
                title: "Rate on Amazon AppStore",
                href: "",
              },
              {
                icon: MicrosoftIcon,
                title: "Rate on Microsoft Store",
                href: "",
              },
              {
                icon: MountainIcon,
                title: "Give a star on Codeberg",
                href: "",
              },
              {
                icon: GitlabIcon,
                title: "Give a star on GitLab",
                href: "",
              },
              {
                icon: Github01Icon,
                title: "Give a star on GitHub",
                href: "",
              },
            ]}
          />
        }
        <Activity
          title="Spread the word"
          description={`Share ${app.name} on your social networks`}
          icon={Share05Icon}
          links={[
            {
              icon: MastodonIcon,
              title: <>Toot on Mastodon</>,
              href: "",
            },
            {
              icon: BlueskyIcon,
              title: <>Share on Bluesky</>,
              href: "",
            },
            {
              icon: NeuralNetworkIcon,
              title: <>Share on Fediverse</>,
              href: "",
            },
            { icon: RedditIcon, title: <>Share on Reddit</>, href: "" },
            {
              icon: TelegramIcon,
              title: <>Share via Telegram </>,
              href: "",
            },
            {
              icon: Copy01Icon,
              title: <>Copy URL to clipboard</>,
              onClick: () => undefined,
            },
            {
              icon: Share03Icon,
              title: <>More options</>,
              onClick: () => undefined,
            },
          ].filter((o) => o)}
        />
        <Activity
          title="Connect & Help other"
          description={`Get in touch with the ${app.name} community, discuss and support other`}
          icon={CustomerService01Icon}
          links={[
            {
              icon: MessageMultiple02Icon,
              title: "Join on the forum",
              href: "",
            },
            {
              icon: Tag01Icon,
              title: "Check out tag topics in the forum",
              href: "",
            },
            {
              icon: MatrixIcon,
              title: "Join on Matrix",
              href: "",
            },
            {
              icon: MastodonIcon,
              title: "Join on Mastodon",
              href: "",
            },
            {
              icon: BlueskyIcon,
              title: "Join on Bluesky",
              href: "",
            },
          ]}
          hint="No social communications channel documented"
        />
        <Activity
          title="Edit / Update Information"
          description={`Edit the details about ${app.name} in the source wikis`}
          icon={Edit04Icon}
          links={[
            ...(!app.source.find(
              (s) => s.name === "Software" || s.name === "Layer",
            )
              ? [
                  {
                    icon: MapsSearchIcon,
                    href:
                      "https://wiki.openstreetmap.org/w/index.php?veaction=edit&preload=OSM_Apps_Catalog%2Fnew&editintro=OSM_Apps_Catalog%2Feditintro&summary=Document+an+OSM-related+app+so+that+it+becomes+visible+to+the+OSM+community+and+in+the+OSM+Apps+Catalog.&title=" +
                      encodeURIComponent(app.name),
                    title: (
                      <>
                        Create a page for {app.name} on the OpenStreetMap Wiki
                      </>
                    ),
                  },
                ]
              : app.source
                  .filter(
                    (s) =>
                      s.name === "Software" ||
                      s.name === "Layer" ||
                      s.name === "ServiceItem",
                  )
                  .map((s) => ({
                    icon: MapsSearchIcon,
                    href:
                      s.name === "Software" || s.name === "Layer"
                        ? "https://wiki.openstreetmap.org/w/index.php?veaction=edit&preload=OSM_Apps_Catalog%2Fnew&editintro=OSM_Apps_Catalog%2Feditintro&summary=Document+an+OSM-related+app+so+that+it+becomes+visible+to+the+OSM+community+and+in+the+OSM+Apps+Catalog.&title=" +
                          encodeURIComponent(s.id)
                        : s.url,
                    title: <>Edit page on the OpenStreetMap Wiki</>,
                    description: (
                      <>
                        {languageCodeToDisplay(s.language)}, {s.name} Template
                      </>
                    ),
                  }))),
            ...(!app.source.find((s) => s.name === "Wikidata")
              ? [
                  {
                    icon: BarCode02Icon,
                    href:
                      "https://www.wikidata.org/w/index.php?title=Special:Search&search=" +
                      encodeURIComponent(app.name),
                    title: <>Create item on Wikidata</>,
                  },
                ]
              : app.source
                  .filter((s) => s.name === "Wikidata")
                  .map((s) => ({
                    icon: BarCode02Icon,
                    href: s.url,
                    title: <>Edit item on Wikidata</>,
                  }))),
          ]}
        />
      </ItemGroup>
      <ItemGroup>
        <span className="px-4 font-medium text-muted-foreground">
          App development
        </span>
        <Activity
          title="Report bugs"
          description={`Report bugs, discuss ideas, and propose features for ${app.name}`}
          icon={MessageMultiple02Icon}
          link={app.community.issueTracker}
          hint="No link to issue tracker documented"
        />
        <Activity
          title="Translate text"
          description={`Add translations to make ${app.name} accessible for more people around the world`}
          icon={TranslateIcon}
          link={app.languagesUrl}
          hint="No link translate contribute documented"
        />
        <Activity
          title="Get involved into coding"
          description="Develop new features, help fix bugs, and review code"
          icon={SourceCodeIcon}
          link={app.sourceCode}
          hint="No link to source code documented."
        />
        <Activity
          title="Contribute map data"
          description={`Add info about points of interest or other map data used by ${app.name} to OSM`}
          icon={Location05Icon}
          link="https://wiki.openstreetmap.org/wiki/Contribute_map_data"
        />
      </ItemGroup>
    </div>
  );
}
