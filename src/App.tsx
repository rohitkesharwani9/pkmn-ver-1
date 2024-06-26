import classNames from "classnames";
import * as React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { useRegisterSW } from "virtual:pwa-register/react";
import { CoverageType, Pokemon } from "./data-types";
import { detectLanguage } from "./detectLanguage";
import { formatPokemonName } from "./formatPokemonName";
import { MonsterImage } from "./MonsterImage";
import { ScreenCoverageList } from "./ScreenCoverageList";
import { ScreenDefense } from "./ScreenDefense";
import { ScreenMore } from "./ScreenMore";
import { ScreenOffense } from "./ScreenOffense";
import { ScreenPokedex } from "./ScreenPokedex";
import { ScreenPokedexHelp } from "./ScreenPokedexHelp";
import { ScreenWeaknessCoverage } from "./ScreenWeaknessCoverage";
import { publicPath } from "./settings";
import { useFetchJSON } from "./useFetchJSON";
import { useGeneration } from "./useGeneration";
import { useLanguage } from "./useLanguage";
import { useTheme } from "./useTheme";
import { useUpdateSW } from "./useUpdateSW";
import styles from "./App.module.css";
import Spinner from "./Spinner";

const tabClass = classNames([
  "no-underline",
  "pv1 ph3 f5",
  "focus-tab",
  "tc b",
  "ba border1 br-pill",
  "bg1 fg1",
  "active-squish",
]);

const tabClassActive = classNames(["button-selected"]);

function getFallback(key: string): string {
  if (key === "title") {
    return "Pokemon Type Calculator";
  }
  return "…";
}

function useTranslationsWithBlankFallback() {
  const { t: translation, ready } = useTranslation(undefined, {
    useSuspense: false,
  });
  return ready ? translation : getFallback;
}

export function App() {
  // Service worker
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    // offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW();
  useUpdateSW();

  async function updateApp() {
    setNeedRefresh(false);
    await updateServiceWorker(true);
  }

  const t = useTranslationsWithBlankFallback();
  const { i18n } = useTranslation(undefined, { useSuspense: false });

  // State...
  const [generation] = useGeneration();
  const [defenseParams, setDefenseParams] = React.useState("");
  const [offenseParams, setOffenseParams] = React.useState("");
  const [pokedexParams, setPokedexParams] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [coverageTypes, setCoverageTypes] = React.useState<CoverageType[]>([]);
  const [fallbackCoverageTypes, setFallbackCoverageTypes] = React.useState<
    CoverageType[]
  >([]);
  const [AllPokemon, setAllPokemon] = React.useState<Pokemon[]>([]);
  const [easterEgg, setEasterEgg] = React.useState<Pokemon>();
  const [easterEggLoadedID, setEasterEggLoadedID] = React.useState("");

  const [language] = useLanguage();

  React.useEffect(() => {
    async function load() {
      await i18n.changeLanguage(language || detectLanguage());
      document.documentElement.lang = i18n.language;
    }
    load();
  }, [language, i18n]);

  // Theme stuff
  const [theme] = useTheme();
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isDark = theme === "dark" || (theme === "auto" && isDarkMode);
  const themeColor = isDark ? "hsl(357, 70%, 40%)" : "hsl(357, 97%, 46%)";
  const themeAuto = isDarkMode ? "dark" : "light";

  // Load Pokédex JSON
  const jsonURL = new URL("data-pkmn.json", publicPath).href;
  const allPokemonResponse = useFetchJSON<Pokemon[]>(jsonURL);

  // Fallback coverage types
  React.useEffect(() => {
    if (allPokemonResponse.type !== "done") {
      return;
    }
    const allPokemon = allPokemonResponse.data;
    const fallbackCoverageTypes = allPokemon.map<CoverageType>((pkmn) => {
      const name = formatPokemonName({
        speciesName: pkmn.speciesNames[language] || pkmn.speciesNames.en,
        formName: pkmn.formNames[language] || pkmn.formNames.en,
      });
      const number = String(pkmn.number);
      const types = pkmn.types;
      return { number, name, types };
    });
    setIsLoading(false);
    setCoverageTypes(fallbackCoverageTypes);
    setFallbackCoverageTypes(fallbackCoverageTypes);
    setAllPokemon(allPokemon);
  }, [allPokemonResponse, language]);

  return (
    <HelmetProvider>
      <Helmet>
        <html data-theme={theme} data-theme-auto={themeAuto} />
        <meta name="theme-color" content={themeColor} />
        <title>{t("title")}</title>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2305974348753248" crossOrigin="anonymous"></script>
      </Helmet>
      <div className="flex-auto">
        <h1 className={`f3-ns f4 tc relative white ${styles.header}`}>
          <Link to="/" className="no-underline white focus-outline br1">
            {t("title")}
          </Link>
          <div
            className={styles.headerButton}
            onClick={(event) => {
              event.preventDefault();
              const i = Math.floor(Math.random() * AllPokemon.length);
              const pkmn = AllPokemon[i];
              if (!pkmn) return;
              setEasterEgg(pkmn);
            }}
          />
          {easterEgg && (
            <div
              className={styles.easterEgg}
              data-animate={easterEggLoadedID === easterEgg.id}
            >
              <MonsterImage
                pokemonID={easterEgg.id}
                types={easterEgg.types}
                imageType={easterEgg.imageType}
                onLoad={({ pokemonID }) => {
                  setEasterEggLoadedID(pokemonID);
                }}
                scale={2}
              />
            </div>
          )}
        </h1>

        {/* Google AdSense */}
        <ins className="adsbygoogle"
             style={{ display: "block" }}
             data-ad-client="ca-pub-2305974348753248"
             data-ad-slot="3867516561"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </script>

        <nav className={`bg1 bb border2 ${styles.tabBar} pb2 ph2`}>
         <a href="https://pkmnn.help" target="_blank" rel="noopener" className={tabClass}>
         All Tools
         </a>
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to={`/offense/${offenseParams}`}
          >
            {t("navigation.offense")}
          </NavLink>
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to={`/defense/${defenseParams}`}
          >
            {t("navigation.defense")}
          </NavLink>
          <NavLink
            className={tabClass}
            activeClassName={tabClassActive}
            to={`/pokedex/${pokedexParams}`}
          >
            {t("navigation.pokedex")}
          </NavLink>
          <NavLink
            className={classNames(tabClass, needRefresh && styles.pleaseUpdate)}
            activeClassName={tabClassActive}
            to="/more/"
          >
            {t("navigation.more")}
          </NavLink>
          <a href="https://pkmnn.help/pokemon-type-chart/" target="_blank" rel="noopener" className={tabClass}>
         Type Chart
         </a>
        </nav>


        <nav className={`bg1 bb border2 ${styles.tabBar} pb2 ph2`}>
        
    <a href="#" className={tabClass}>Share To - </a>
          <a href="whatsapp://send?text=🔥🌟🚀 Check out my Online Pokemon Type Calculator Tool https://type.pkmnn.help 🎮🔥 Don't miss the action! Click and View NOW!🔥" target="_blank" rel="noopener" className={tabClass}>
         <img src="/wa.svg" alt="Whatsapp" width="25" height="15"/></a>
           <a href="https://twitter.com/intent/tweet?url=🔥🌟🚀 Check out my Online Pokemon Type Calculator Tool https://type.pkmnn.help 🎮🔥 Don't miss the action! Click and View NOW!🔥" target="_blank" rel="noopener" className={tabClass}>
         Twitter
         </a><a href="https://www.facebook.com/sharer.php?u=https://type.pkmnn.help&quote=🔥🌟🚀 Check out my Online Pokemon Type Calculator Tool https://type.pkmnn.help 🎮🔥 Don't miss the action! Click and View NOW!🔥" target="_blank" rel="noopener" className={tabClass}>
         Facebook
         </a><a href="https://www.reddit.com/submit?url=https://type.pkmnn.help&title=🔥🌟🚀 Check out my Online Pokemon Type Calculator Tool https://type.pkmnn.help 🎮🔥 Don't miss the action! Click and View NOW!🔥" target="_blank" rel="noopener" className={tabClass}>
         Reddit
         </a><a href="https://www.pinterest.com/pin/create/button/?url=https://type.pkmnn.help&description=🔥🌟🚀 Check out my Online Pokemon Type Calculator Tool https://type.pkmnn.help 🎮🔥 Don't miss the action! Click and View NOW!🔥" target="_blank" rel="noopener" className={tabClass}>
         Pinterest
         </a>
   
        </nav>
        
  <p className="pa3 center content-narrow lh-copy">
    To share your exact Pokédex, Defense, or offense team that is created on this page, copy the URL of that page and share it with friends or on any social media.
  </p>

  {/* Google AdSense */}
  <ins className="adsbygoogle"
       style={{ display: "block" }}
       data-ad-client="ca-pub-2305974348753248"
       data-ad-slot="3867516561"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>
    {`(adsbygoogle = window.adsbygoogle || []).push({});`}
  </script>

        <React.Suspense fallback={<Spinner />}>
          <Switch>
            <Route
              exact
              path="/offense/coverage/weakness/"
              render={() => (
                <ScreenCoverageList
                  mode="weakness"
                  generation={generation}
                  coverageTypes={coverageTypes}
                />
              )}
            />
            <Route
              exact
              path="/offense/coverage/resistance/"
              render={() => (
                <ScreenCoverageList
                  mode="resistance"
                  generation={generation}
                  coverageTypes={coverageTypes}
                />
              )}
            />
            <Route
              exact
              path="/offense/coverage/normal/"
              render={() => (
                <ScreenCoverageList
                  mode="normal"
                  generation={generation}
                  coverageTypes={coverageTypes}
                />
              )}
            />
            <Route
              exact
              path="/offense/coverage/"
              render={() => (
                <ScreenWeaknessCoverage
                  setCoverageTypes={setCoverageTypes}
                  offenseParams={offenseParams}
                  fallbackCoverageTypes={fallbackCoverageTypes}
                  isLoading={isLoading}
                />
              )}
            />
            <Route
              exact
              path="/offense/"
              render={() => (
                <ScreenOffense
                  generation={generation}
                  coverageTypes={coverageTypes}
                  setOffenseParams={setOffenseParams}
                  fallbackCoverageTypes={fallbackCoverageTypes}
                  isLoading={isLoading}
                />
              )}
            />
            <Route
              exact
              path="/defense/"
              render={() => (
                <ScreenDefense
                  generation={generation}
                  setDefenseParams={setDefenseParams}
                />
              )}
            />
            <Route
              exact
              path="/pokedex/help/"
              render={() => <ScreenPokedexHelp pokedexParams={pokedexParams} />}
            />
            <Route
              exact
              path="/pokedex/"
              render={() => (
                <ScreenPokedex
                  setPokedexParams={setPokedexParams}
                  allPokemon={AllPokemon}
                  isLoading={isLoading}
                />
              )}
            />
            <Route
              exact
              path="/more/"
              render={() => (
                <ScreenMore
                  needsAppUpdate={needRefresh}
                  updateApp={updateApp}
                />
              )}
            />
            <Redirect to="/defense/" />
          </Switch>
        </React.Suspense>
      </div>
    </HelmetProvider>
  );
}
