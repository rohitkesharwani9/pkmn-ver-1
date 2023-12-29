import classNames from "classnames";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "./Button";
import { CollapsibleSection } from "./CollapsibleSection";
import { generations, isGeneration } from "./data-generations";
import { resetApp } from "./resetApp";
import { Select } from "./Select";
import { useGeneration } from "./useGeneration";
import { useLanguage } from "./useLanguage";
import { useTheme } from "./useTheme";
import { useTypeCount } from "./useTypeCount";
import { size } from "lodash";

export interface ScreenMoreProps {
  needsAppUpdate: boolean;
  updateApp: () => Promise<void>;
}

export function ScreenMore({
  needsAppUpdate,
  updateApp,
}: ScreenMoreProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const [generation, setGeneration] = useGeneration();
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();
  const [typeCount, setTypeCount] = useTypeCount();
  const year = new Date().getFullYear();

  return (
    <main className="pa3 center content-narrow lh-copy">
      <div
        hidden={!needsAppUpdate}
        className={classNames([
          "button-shadow",
          "bg1 fg1",
          "border2 ba br2",
          "pa3",
          "center",
          "flex flex-column gap1",
        ])}
      >
        <div className="flex gap1">
          <span className="flex flex-auto items-center">
            {t("banners.updateReady.description")}
          </span>
          <Button
            className="ml3"
            size="small"
            type="button"
            onClick={updateApp}
          >
            {t("banners.updateReady.update")}
          </Button>
        </div>
        <div role="presentation" className="mv2 bt border3" />
        <div>
          <a
            href="https://github.com/rohitkesharwani9/newpoke/blob/HEAD/CHANGELOG.md"
            className="br1 underline fg-link focus-outline"
          >
            {t("banners.updateReady.whatsNew")}
          </a>
        </div>
      </div>

      <h2 className="lh-title f4">{t("more.contact.heading")}</h2>

      

      <p>
        <Trans
          i18nKey="more.contact.intro"
          values={{}}
          components={{
            homepage: (
              <a
                href="https://pkmnn.help/"
                className="br1 underline fg-link focus-outline"
              />
            ),
          }}
        />
      </p>


      <p>
        <Trans
          i18nKey="more.contact.typechart"
          values={{}}
          components={{
            typechart: (
              <a
                href="https://pkmnn.help/pokemon-type-chart/"
                className="br1 underline fg-link focus-outline"
              />
            ),
            team: (
              <a
                href="https://pkmnn.help/pokemon-team-builder/"
                className="br1 underline fg-link focus-outline"
              />
            ),
          }}
        />
      </p>


      <p>
        <Trans
          i18nKey="more.contact.email"
          components={{
            email: (
              <a
                className="br1 underline fg-link focus-outline"
                href="mailto:me@rohitkesharwani.com"
              />
            ),
          }}
        />
      </p>

      <div role="presentation" className="mv2 bt border3" />

      <h2 className="lh-title f4">{t("more.settings.heading")}</h2>

      <div className="grid gap3 pb2">
        <Select
          label={t("more.settings.language.label")}
          value={language}
          helpText={t("more.settings.language.helpText")}
          onChange={(event) => {
            setLanguage(event.target.value);
            i18n.changeLanguage(language);
          }}
        >
          <option value="">{t("more.settings.language.default")}</option>
          <option disabled>&ndash;</option>
          <option value="en">English</option>
          <option value="es">Español (Spanish)</option>
          <option value="pt-BR">
            Português Brasileiro (Brazilian Portuguese)
          </option>
          <option value="de">Deutsch (German)</option>
          <option value="da">Dansk (Danish)</option>
          <option value="it">Italiano (Italian)</option>
          <option value="fr">Français (French)</option>
          <option value="ro">Română (Romanian)</option>
          <option value="pl">Polski (Polish)</option>
          <option value="ru">Русский (Russian)</option>
          <option value="kk">Қазақша (Kazakh)</option>
          <option value="ja">日本語 (Japanese)</option>
          <option value="ja-Hrkt">にほんご (Japanese Kana-only)</option>
          <option value="zh-Hans">简体中文 (Simplified Chinese)</option>
          <option value="zh-Hant">繁體中文 (Traditional Chinese)</option>
          <option value="ko">한국어 (Korean)</option>
        </Select>

        <Select
          label={t("more.settings.theme.label")}
          value={theme}
          helpText={t("more.settings.theme.help")}
          onChange={(event) => {
            setTheme(event.target.value);
          }}
        >
          <option value="auto">{t("more.settings.theme.values.auto")}</option>
          <option value="light">{t("more.settings.theme.values.light")}</option>
          <option value="dark">{t("more.settings.theme.values.dark")}</option>
        </Select>

        <Select
          label={t("games.label")}
          value={generation}
          helpText={t("games.help")}
          onChange={(event) => {
            const { value } = event.target;
            if (isGeneration(value)) {
              setGeneration(value);
            } else {
              // eslint-disable-next-line no-console
              console.error("not a generation:", value);
            }
          }}
        >
          {generations.map((gen) => {
            return (
              <option key={gen} value={gen}>
                {t(`games.byID.${gen}`)}
              </option>
            );
          })}
        </Select>

        <Select
          label={t("more.settings.typeCount.label")}
          value={typeCount}
          helpText={t("more.settings.typeCount.help")}
          onChange={(event) => {
            setTypeCount(event.target.value);
          }}
        >
          <option value="2">{t("more.settings.typeCount.values.2")}</option>
          <option value="3">{t("more.settings.typeCount.values.3")}</option>
        </Select>
      </div>

      <div role="presentation" className="mv2 bt border3" />
{/*
      <CollapsibleSection
        heading={
          <h2 className="lh-title f4 dib">{t("more.changes.heading")}</h2>
        }
      >
        <p>
          <Trans
            i18nKey="more.changes.description"
            components={{
              changelog: (
                <a
                  href="https://github.com/rohitkesharwani9/newpoke/blob/HEAD/CHANGELOG.md"
                  className="br1 underline fg-link focus-outline"
                />
              ),
            }}
          />
        </p>
      </CollapsibleSection>
          */}
      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={<h2 className="lh-title f4 dib">{t("more.help.heading")}</h2>}
      >
        <div className="mv3">
          <Button onClick={resetApp}>
            {t("more.help.serviceWorker.button")}
          </Button>
        </div>

        <p>{t("more.help.serviceWorker.description")}</p>
      </CollapsibleSection>

      <div role="presentation" className="mv2 bt border3" />

       {/* faq section start */}
      <p style={{ fontSize: '30px' , fontWeight: 'bold'}}>Frequently Asked Questions (FAQ)</p>
      <div style={{ fontSize: '20px' , fontWeight: 'bold'}}>
    <details>
       <summary>What is a Pokémon Type Calculator?</summary>
      <div>
      A Pokémon Type Calculator is a tool that helps trainers analyze and understand the strengths and weaknesses of different Pokémon types in battles. It aids in strategic planning by providing insights into type matchups.
      </div>
    </details><br/>

    <details>
       <summary>How can I use the Pokémon Type Calculator on this website?</summary>
      <div>
      You can use our Pokémon Type Calculator by selecting the types of Pokémon involved in a battle. The tool will then provide information on the effectiveness of moves based on the types of the Pokémon.
      </div>
    </details><br/>

    <details>
       <summary>Tell me more about Pokémon typing and how it affects battles.</summary>
      <div>
      Pokémon typing determines how effective or resistant a Pokémon is to certain types of moves. Understanding typing is crucial for building a well-balanced and strategic team.
      </div>
    </details><br/>

    <details>
       <summary>What does the term "pokemon weaknesses calculator" mean?</summary>
      <div>
      A Pokémon Weakness Calculator helps trainers identify the vulnerabilities of their Pokémon by highlighting the types of moves that are super effective against them.
      </div>
    </details><br/>

    <details>
       <summary>How can the Pokémon Weakness Calculator assist me in battle strategies?</summary>
      <div>
       The Pokémon Weakness Calculator allows you to plan your battles more effectively by understanding which types of moves your Pokémon are weak against and adjusting your strategy accordingly.
      </div>
    </details><br/>
    <details>
       <summary>Is there a difference between "pokemon weakness calculator" and "pokemon type calculator"?</summary>
      <div>
      While both terms are often used interchangeably, a Pokémon Weakness Calculator typically focuses on identifying vulnerabilities, whereas a Pokémon Type Calculator may encompass a broader range of features, including type matchups.
      </div>
    </details><br/>

    <details>
       <summary>Explain the concept of a type calculator in the context of Pokémon.</summary>
      <div>
         In Pokémon, a Type Calculator is a tool that helps trainers analyze the effectiveness of moves based on the types of Pokémon involved in battles. It aids in strategic decision-making during battles.
      </div>
    </details><br/>
    <details>
       <summary>How does the Pokémon Type Matchup feature work on this website?</summary>
      <div>
        The Pokémon Type Matchup feature on our website provides a comprehensive chart displaying the effectiveness of each type against every other type. It serves as a quick reference for type matchups in battles.
      </div>
    </details><br/>

    <details>
       <summary>Can I find information about Pokémon types and matchups in the Pokédex section?</summary>
      <div>
         Yes, the Pokédex section on our website provides detailed information about Pokémon types, matchups, and characteristics. It serves as a valuable resource for trainers looking to enhance their battle strategies.
      </div>
    </details><br/>




    <details>
       <summary>What is the significance of Pokémon typing in battles?</summary>
      <div>
      Pokémon typing is significant in battles as it determines how effective or resistant a Pokémon is to different types of moves. Trainers use this information to create well-balanced teams and make strategic decisions during battles.
      </div>
    </details><br/>

    <details>
       <summary>How can I determine a Pokémon's weaknesses using the type chart calculator?</summary>
      <div>
      The Type Chart Calculator allows you to input the types of Pokémon in a battle, revealing the effectiveness of moves. It helps identify vulnerabilities by showing which types deal more or less damage.
      </div>
    </details><br/>
    <details>
       <summary>Tell me more about the Pokémon Type Effectiveness Calculator.</summary>
      <div>
        The Pokémon Type Effectiveness Calculator assesses how effective certain moves are against different Pokémon types. It aids in planning strategies by highlighting the relative strength of each move.
      </div>
    </details><br/>

    <details>
       <summary>How does the Pokémon Coverage Calculator enhance battle strategies?</summary>
      <div>
        The Pokémon Coverage Calculator is a powerful tool for strategizing battles. It analyzes the types of moves your Pokémon can learn, helping you build a team with diverse move coverage to handle various opponents.
      </div>
    </details><br/>
    <details>
       <summary>Is there a "Pokémon Team Type Calculator" on this site?</summary>
      <div>
        Yes, our site features a Pokémon Team Type Calculator that helps you optimize your team by considering the types of Pokémon you include. It ensures a well-balanced and strategically sound team composition.
      </div>
    </details><br/>

    <details>
       <summary>Can I generate Pokémon teams based on types using the Pokémon Type Generator?</summary>
      <div>
      Absolutely! The Pokémon Type Generator allows you to generate balanced teams by suggesting Pokémon of different types. It's a handy tool for trainers aiming to diversify their teams for optimal battle performance.
      </div>
    </details><br/>
    <details>
       <summary>What information does the Pokédex provide on this website?</summary>
      <div>
      The Pokédex on our website offers comprehensive details about various Pokémon, including their types, weaknesses, and base stats. It serves as a valuable resource for trainers looking to build informed teams.
      </div>
    </details><br/>

    <details>
       <summary>How does the Pokémon Team Defense feature help in team building?</summary>
      <div>
      The Pokémon Team Defense feature analyzes the defensive capabilities of your team by considering the types of Pokémon you have. It aids in creating teams that can withstand various types of attacks.
      </div>
    </details><br/>
    <details>
       <summary>Is there a specific section for solo Pokémon Defense strategies?</summary>
      <div>
        Yes, our website includes a dedicated section for solo Pokémon Defense strategies. It provides insights into strengthening individual Pokémon's defenses, optimizing their survivability in battles.
      </div>
    </details><br/>

    <details>
       <summary>What role does Pokémon Team Attack Planning play in battles?</summary>
      <div>
      Pokémon Team Attack Planning is crucial for developing effective battle strategies. It involves planning which Pokémon will execute specific moves, considering type advantages and disadvantages for optimal results.
      </div>
    </details><br/>
    <details>
       <summary>Tell me about the coverage provided by the Pokédex section on this site.</summary>
      <div>
        The Pokédex section offers extensive coverage, including details on Pokémon types, weaknesses, abilities, and more. It serves as a comprehensive guide for trainers seeking in-depth information about various Pokémon.
      </div>
    </details><br/>

    <details>
       <summary>Can I find information on Pokémon types and combos here?</summary>
      <div>
         Absolutely! Our site provides detailed information on Pokémon types and their combinations. It's a valuable resource for trainers looking to understand the strengths and weaknesses of different type combinations.
      </div>
    </details><br/>



    <details>
       <summary>How does the Pokémon Dual Type Calculator work?</summary>
      <div>
         The Pokémon Dual Type Calculator assists trainers in analyzing the strengths and weaknesses of Pokémon with dual types. It's a handy tool for understanding the combined effects of two types in battles.
      </div>
    </details><br/>

    <details>
       <summary>Explain the term "type of Pokémon" and its significance in battles.</summary>
      <div>
        The term "type of Pokémon" refers to the elemental category a Pokémon belongs to, such as Fire, Water, Grass, etc. Understanding types is crucial in battles as it determines move effectiveness, influencing strategic decisions.
      </div>
    </details><br/>
    <details>
       <summary>Is there a specific calculator for Pokémon type matchups on this site?</summary>
      <div>
      Yes, our site features a Pokémon Type Matchup Calculator, providing a quick reference for type effectiveness in battles. It aids trainers in making informed decisions during Pokémon battles.
      </div>
    </details><br/>

    <details>
       <summary>How can I plan effective attacks using the Pokémon Type Chart Calculator?</summary>
      <div>
      The Pokémon Type Chart Calculator allows you to plan effective attacks by revealing the strengths and weaknesses of different types. It assists in choosing moves that capitalize on opponents' vulnerabilities.
      </div>
    </details><br/>
    <details>
       <summary>Is there a feature for Pokémon type matchup planning on this site?</summary>
      <div>
      Certainly! Our site includes a Pokémon Type Matchup Planning feature, helping trainers plan their strategies by considering the type matchups between their Pokémon and opponents.
      </div>
    </details><br/>

    <details>
       <summary>How does the Pokémon Coverage Calculator contribute to battle strategies?</summary>
      <div>
      The Pokémon Coverage Calculator contributes to battle strategies by assessing the diversity of move types within your team. It ensures a well-rounded move pool, allowing your Pokémon to handle a wide range of opponents.
      </div>
    </details><br/>
    <details>
       <summary>What is the role of the Pokédex in helping with Pokémon team planning?</summary>
      <div>
      The Pokédex plays a vital role in Pokémon team planning by providing comprehensive information on various Pokémon. Trainers can use this knowledge to build teams that complement each other's strengths and weaknesses.
      </div>
    </details><br/>

    <details>
       <summary>Can I find information on Pokémon types and their effectiveness in battles?</summary>
      <div>
      Absolutely! Our site offers detailed information on Pokémon types and their effectiveness in battles. Trainers can use this information to devise effective strategies and make informed decisions during Pokémon battles.
      </div>
    </details><br/>
    </div>
    {/* faq section end */}
      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className="lh-title f4 dib">{t("more.privacy.heading")}</h2>
        }
      >
        <p>
          <Trans
            i18nKey="more.privacy.description"
            components={{
              plausible: (
                <a
                  href="https://plausible.io/pkmn.help"
                  className="br1 underline fg-link focus-outline"
                />
              ),
            }}
          />
        </p>
      </CollapsibleSection>

      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className="lh-title f4 dib">{t("more.givingBack.heading")}</h2>
        }
      >
        <p>{t("more.givingBack.description")}</p>
      </CollapsibleSection>

      <div role="presentation" className="mv2 bt border3" />
  {/*    
        <CollapsibleSection
        heading={
          <h2 className="lh-title f4 dib">{t("more.thanks.heading")}</h2>
        }
      >
        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.da")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Simon</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.ru")}</h3>
        <h3 className="lh-title f5 mt1 mb0">{t("more.thanks.sections.kk")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Abylay Zhandarbek</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.pt-BR")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Vio</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.zh-Hans")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Dragonify</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.ro")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Adam Hayes</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.pl")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Sebastian Biegaj</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.fr")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Kaishidow</li>
          <li>Drakoshen</li>
          <li>Azertor</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.de")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Cozzzy</li>
          <li>Luzifer Senpai</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.it")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Gabriele Giugno</li>
          <li>Fabio “N™” Ilari</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.ko")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Eric Marriott</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.ja")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Minamorl</li>
        </ul>

        <h3 className="lh-title f5 mb0">{t("more.thanks.sections.testing")}</h3>
        <ul className="list mb0 mt1 pl3">
          <li>Jansjo</li>
          <li>Marten</li>
        </ul>

        <h3 className="lh-title f5">{t("more.thanks.sections.other")}</h3>
      </CollapsibleSection>
      */}

      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className="lh-title f4 dib">{t("more.openSource.heading")}</h2>
        }
      >
        <p>
          <Trans
            i18nKey="more.openSource.description"
            components={{
              github: (
                <a
                  href="https://rohitkesharwani.com"
                  className="br1 underline fg-link focus-outline"
                />
              ),
            }}
          />
        </p>
      </CollapsibleSection>

      <div role="presentation" className="mv2 bt border3" />

      <CollapsibleSection
        heading={
          <h2 className="lh-title f4 dib">{t("more.legalInfo.heading")}</h2>
        }
      >
        <p>
          This page utilizes Pokémon content, which is under the copyright of Pokémon &copy; 2002&ndash;{year} Pokémon, &copy; 1995&ndash;{year} Nintendo/Creatures Inc./GAME FREAK inc. &trade;, &copy;. All Pokémon character names are trademarks of Nintendo. It is important to note that there is no intent for copyright or trademark infringement in the use of Pokémon content on this page.
        </p>
        <p>
          Pokédex data is from {}
          <a
            className="br1 underline fg-link focus-outline"
            href="https://pokeapi.co/"
          >
            PokéAPI.
          </a>
          {" And Pokémon Database By "}
          <a
            className="br1 underline fg-link focus-outline"
            href="https://github.com/"
          >
            GitHub
          </a>
          .
        </p>

        <p>
          Pkmnn.help &copy; 2013&ndash;{year}{" "}
          <a
            className="br1 underline fg-link focus-outline"
            href="https://rohitkesharwani.com"
          >
            WebTech By Rohit
          </a>
          .
        </p>
      </CollapsibleSection>
      <div role="presentation" className="mv2 bt border3" />
    </main>
  );
}
