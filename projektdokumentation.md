# Projektdokumentation

**Navn:** 

**Hold:** WU13

**Uddannelse:** Webudvikler

**Uddannelsessted:** Roskilde Tekniske Skole

[Link til min applikaton](http://example.com/)


## Teknologier

--  HTML (structure)
--  JavaScript (logic / data collection)
--  Vite (build system)
--  Sass (css preprocessor)
--  Vitest (testing)
--  GitHub / Netlify (host)

---



### Redegørelse for oprindelsen af evt. tredjeparts kode anvendt i opgaveløsningen (Teknisk dokumentation)

(Hvilke node-pakker har du installeret for at dit projekt virker? Beskriv kort hvilket "problem" hver pakke løser.)

sass - forbedre måden at skrive styles på
vite - build tool og development server

---

### Argumentation for de valg du selvstændigt har truffet under løsningen af opgaven

(Hvilke overvejelser har du gjort dig, fx. i forbindelse med dit valg af animationer)
Jeg satte mig for kun at ville have tre html filer - en til home, en til archive og en til popular. Resten (splash, onboarding og settings) ville jeg sætte ind og fjerne igen dynamisk, så siden flowede bedre. Det syntes jeg at jeg har fået løst godt.



---
### Vurdering af egen indsats & gennemførelse af opgaveforløbet (Arbejdsgangen)

(Hvad gik godt. Hvor prioriterede du forkert. Klagesange fra de varme lande om halvfærdigt produkt, på grund af manglende nattesøvn, fordi din kæle-skildpadde havde tandpine er IKKE interessante.)

jeg syntes det gik godt med at få gjort det hele modulært. ville ønske jeg havde haft længere tid til animationer, da jeg her i slutspurten brugte meget chatGPT for at få animationer til at fungere. 

Jeg skulle nok også have priotireret min tid bedre, da jeg ikke har noget at lave login siden. Men jeg ville have lavet den og implementeret den på samme måde, som min splash og onboarding.



---
### En beskrivelse af særlige punkter til bedømmelse

(er der en særlig detalje som du synes din underviser bør lægge mærke til når dit projekt evalueres)

Du kan vise kode i markdown på følgende måder: 
```js
const app = document.querySelector("#app");


(async function init() {
const { container, searchableArticles } = await newStories()
const { settingsContainer } = await settingsData()

let splash = splashScreen()

if (!readFromSessionStorage('splash')) {

    app.append(splash)
    saveToSessionStorage('splash', true)

    setTimeout(() => {

        splash.remove()

        let NotFirstTime = readFromLocalStorage("hasOnboarded")

        if (!NotFirstTime) {
            app.append(onboarding(() => {

                saveTolocalStorage("hasOnboarded", true)

                const ob = document.querySelector(".onboarding");
                if (ob) ob.remove()

                app.append(header(searchableArticles, "news"), container, settingsContainer, footer())
                darkMode()
                swiperAdd()
                
            }))
        } else {
            app.append(header(searchableArticles, "news"), container, settingsContainer, footer())
            darkMode()
            swiperAdd()
        }

    }, 3000);

} else {

    app.append(header(searchableArticles, "news"), container, settingsContainer, footer())
    darkMode()
    swiperAdd()

}

})();
```

jeg er meget stolt og tilfreds med den måde jeg har fået implementeret splash og onboarding



