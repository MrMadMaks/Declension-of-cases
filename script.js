const star22 = document.querySelector('.form__star22')
const star33 = document.querySelector('.form__star33')
const star11 = document.querySelector('.form__star11')
const pass = document.querySelector('.form__password')
const email = document.querySelector('.form__email')
const che = document.querySelector('.form__check')
const btn = document.querySelector('.form__btn')
const lbl = document.querySelector('._label-for-check')
const box = document.querySelector('.form__check-mark')
const fle = document.querySelector('.form__label-email')
const flp = document.querySelector('.form__label-pass')
const form = document.querySelector('.form')
const result = document.querySelector('.result')
const user = {}

form.addEventListener('submit', (e) => {
    e.preventDefault()
})


btn.addEventListener('click', () => {
    if (pass.value === '') {
        star22.style.display = 'block';
        flp.style.color = '#cb2424'
    }
    if (email.value === '') {
        star11.style.display = 'block';
        fle.style.color = '#cb2424'
    }
    if (che.getAttribute('type') === 'checkbox' && che.checked === false) {
        star33.style.display = 'block';
        lbl.style.display = 'block';
        box.style.border = '2px solid #cb2424';
    }
    if (pass.value !== '' && email.value !== '' && che.getAttribute('type') === 'checkbox' && che.checked === true) {

        const email = document.querySelector('.form__email').value;
        const password = document.querySelector('.form__password').value;
        user.email = email
        user.password = password
    }

    result.value = toCase(user.email, user.password)

    function toCase(str, choice) {
        let strPub = { // правила для окончаний
            "а": ["ы", "е", "у", "ой", "е"],
            "(ш/ж/к/ч)а": ["%и", "%е", "%у", "%ой", "%е"],
            "б/в/м/г/д/л/ж/з/к/н/п/т/ф/ч/ц/щ/р/х": ["%а", "%у", "%а", "%ом", "%е"],
            "и": ["ей", "ям", "%", "ями", "ях"],
            "ый": ["ого", "ому", "%", "ым", "ом"],
            "й": ["я", "ю", "я", "ем", "е"],
            "о": ["а", "у", "%", "ом", "е"],
            "с/ш": ["%а", "%у", "%", "%ом", "%е"],
            "ы": ["ов", "ам", "%", "ами", "ах"],
            "ь": ["я", "ю", "я", "ем", "е"],
            "уль": ["ули", "уле", "улю", "улей", "уле"],
            "(ч/ш/д/т)ь": ["%и", "%и", "%ь", "%ью", "%и"],
            "я": ["и", "е", "ю", "ей", "е"]
        },
            cases = { // номера для падежей, не считая Именительный
                "родительный": 0,
                "дательный": 1,
                "винительный": 2,
                "творительный": 3,
                "предложный": 4
            },
            exs = { // исключения, сколько символов забирать с конца
                "ц": 2,
                "ок": 2
            },
            lastIndex, reformedStr, forLong, splitted, groupped, forPseudo;
        for (let i in strPub) {
            if (i.length > 1 && str.slice(-i.length) == i) { // для окончаний, длиной >1
                lastIndex = i;
                reformedStr = str.slice(0, -lastIndex.length);
                break;
            }
            else if (/[\(\)]+/g.test(i)) { // фича: группировка окончаний
                i.replace(/\(([^\(\)]+)\)([^\(\)]+)?/g, function (a, b, c) {
                    splitted = b.split("/");
                    for (let o = 0; o < splitted.length; o++) {
                        groupped = splitted[o] + c;
                        strPub[groupped] = strPub[i];
                        if (str.slice(-groupped.length) == groupped) {
                            for (let x = 0, eachSplited = strPub[groupped]; x < eachSplited.length; x++) {
                                eachSplited[x] = eachSplited[x].replace("%", splitted[o]);
                            }
                            reformedStr = str.slice(0, -groupped.length);
                            forPseudo = groupped;
                        }
                    }
                })
            }
            else { // дефолт
                lastIndex = str.slice(-1);
                reformedStr = str.slice(0, -(forPseudo || lastIndex).length);
            }
            if (/\//.test(i) && !(/[\(\)]+/g.test(i)) && new RegExp(lastIndex).test(i)) forLong = i; // группированные окончания, разделающиеся слешем
            for (let o in exs) { // поиск исключений
                if (str.slice(-o.length) == o) reformedStr = str.slice(0, -exs[o]);
            }
        }
        return reformedStr + strPub[(forPseudo || forLong || lastIndex)][cases[choice]].replace("%", lastIndex)
    }
})


