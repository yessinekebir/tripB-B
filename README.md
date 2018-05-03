# Server : NodeJs (Express)    -    Database : MongoDB    -   Client : Vue Js
**Architettura del sistema: Client - Server**

LOG: Presentazione aggiunta alla cartella di lavoro -> Presentazione TripBnB.pdf

Il progetto in questione simula un sistema di affitto case vacanza.

Le API utilizzate per il seguente progetto seguono tutte la filosofia REST.

Per l'integrazione tra server in Node ed il database in MongoDB è stato utilizzato Mongoose.

Il middleware implementato ed utilizzato per gran parte delle chiamate API è : auth ; Posizionato in middlewares/auth.js  (Ha la funzione di controllare se l'utente ha effettuato l'accesso o meno)

***Server:***

* **/signup** - Registrazione di un utente  > Chiamata di tipo POST (Creazione di una risorsa) ->  Nome,cognome,email,password (La password prima di essere salvata nel database, per motivi di sicurezza, viene criptata tramite il pacchetto bcrypt.)
```
router.post('/signup', function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.email = req.body.email;
    user.save(function(err, userCreated) {
        if (err) return res.status(400).json(err);
        res.status(201).json(userCreated);
    })
})
```

* **/login** - Accesso tramite credenziali registrate > Chiamata di tipo POST   -> Email e password richiesti (Converte nuovamente la password dell'utente ,viene confrontata con la password precedentemente criptata, se uguale , viene lasciato un token , con il quale è possibile effettuare diverse chiamate API quali (Aggiunta di un'annuncio di una casa, affitto di una casa, like ad un annuncio di una casa ed aprire la chat con l'autore dell'annuncio))

```
router.post('/login', function(req, res) {
    User.findOne({email: req.body.email}, function(err, user){
        if (user === null) {
            return res.status(404).json({message: 'User not found'})
        } else if (bcrypt.compareSync(req.body.password, user.password)) {
            var token = jwt.encode(user._id, auth.secret);
            return res.json({token: token});
        } else {
            return res.status(401).json({message: 'password not valid'});
        }

    })

})
```
* **/me** - (Login richiesto) - Vengono tornati tutti i dati dell'utente che ha effettuato l'accesso (Utili per visualizzarne le informazioni personali)

```
router.get('/me', auth.verify, function(req, res, next) {
    res.json(req.user);
});
```
**/houses/** - Aggiunta di un nuovo annuncio (Login richiesto) > Chiamata di tipo POST  -> Città, indirizzo e prezzo giornaliero per l'affitto richiesti. (Aggiunta dell'ID della casa nel account dell'utente che crea la casa) // Di default il campo admin della casa , viene riempito dall'ID dell'utente che crea l'annuncio.
```
router.post('/', auth.verify,  function(req, res){
    var house = new House();
    house.admin = req.user._id;
    house.city = req.body.city;
    house.address = req.body.address;
    house.price = req.body.price;
    house.save(function(err, houseSaved) {
        if (err) return res.status(500).json({message: err});
        req.user.house.push(houseSaved._id);
        req.user.save(function(err, userSaved) {
          res.status(201).json(houseSaved)
        })
    });
});
```

* **/houses/:id/rent** - Affitto di una casa (Login richiesto) > Chiamata di tipo POST  -> ID_Casa , data di inizio e data di fine soggiorno richiesti.  (Il campo id_casa viene riempito al click di un determinato annuncio) // Di default quando un utente affitta una casa, il campo rent dello schema dell'utente , viene riempito con l'id della casa affittata

* **/houses/:id/like** - Like verso un annuncio (Login richiesto) > Chiamata di tipo POST -> id_casa richiesto, associato in automatico con il click sull'icona del like.
