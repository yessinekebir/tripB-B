# Server : NodeJs (Express)    -    Database : MongoDB    -   Client : Vue Js
**Architettura del sistema: Client - Server**

Il progetto in questione simula un sistema di affitto case vacanza.

Le API utilizzate per il seguente progetto seguono tutte la filosofia REST.

Per l'integrazione tra server in Node ed il database in MongoDB è stato utilizzato Mongoose.

Il middleware implementato ed utilizzato per gran parte delle chiamate API è : auth ; Posizionato in middlewares/auth.js  (Ha la funzione di controllare se l'utente ha effettuato l'accesso o meno)

***Server:***

* [X] **/signup** - Registrazione di un utente  > Chiamata di tipo POST (Creazione di una risorsa) ->  Nome,cognome,email,password (La password prima di essere salvata nel database, per motivi di sicurezza, viene criptata tramite il pacchetto bcrypt.)

* [X] **/login** - Accesso tramite credenziali registrate > Chiamata di tipo POST   -> Email e password richiesti (Converte nuovamente la password dell'utente ,viene confrontata con la password precedentemente criptata, se uguale , viene lasciato un token , con il quale è possibile effettuare diverse chiamate API quali (Aggiunta di un'annuncio di una casa, affitto di una casa, like ad un annuncio di una casa ed aprire la chat con l'autore dell'annuncio))

* [X] **/me** - (Login richiesto) - Vengono tornati tutti i dati dell'utente che ha effettuato l'accesso (Utili per visualizzarne le informazioni personali)


* [X] **/houses/** - Aggiunta di un nuovo annuncio (Login richiesto) > Chiamata di tipo POST  -> Città, indirizzo e prezzo giornaliero per l'affitto richiesti. (Aggiunta dell'ID della casa nel account dell'utente che crea la casa) // Di default il campo admin della casa , viene riempito dall'ID dell'utente che crea l'annuncio.


* [X] **/houses/:id/rent** - Affitto di una casa (Login richiesto) > Chiamata di tipo POST  -> ID_Casa , data di inizio e data di fine soggiorno richiesti.  (Il campo id_casa viene riempito al click di un determinato annuncio) // Di default quando un utente affitta una casa, il campo rent dello schema dell'utente , viene riempito con l'id della casa affittata

* [ ] **/houses/:id/like** - Like verso un annuncio (Login richiesto) > Chiamata di tipo POST -> id_casa richiesto, associato in automatico con il click sull'icona del like.

**#LOG**

| Data     | Descrizione |
| ---      | ---       |
| 03/05/2018 | Aggiunta *Presentazione TripBnB.pdf*         |




### Setup & Info ###
Environments: `DEV`,`QUAL`, `UAT`, `PROD`.

 **Building SXP**
  ## REQUIREMENTS ##
    - Cordova
    - Ruby
    - Cocoapods
    - iOS App Token
    - NewRelic
 
  ### Steps ###
   - Install Cordova 
      > `sudo npm install -g cordova`
   - Add Cordova Platform
      > `cordova platform add ios`
   - Install Cocoapods
      > `sudo gem install cocoapods`
   - Setting up CocoaPods
      > `pod setup`
   - Install newrelic cordova plugin
     > `cordova plugin add https://github.com/newrelic/newrelic-cordova-plugin.git --variable IOS_APP_TOKEN="{ios-app-token}" --variable ANDROID_APP_TOKEN="{android-app-token}"`
   - Build app
     > `cordova build ios` (from /cordova)

### Commands: ###
`yarn start` 
>	Run instance of application on port 3000 using stub in **DEV** env.

`yarn start:qual`
>	Run instance of application on port 3000 using api of **quality** env. 	

`yarn start:prod`
>	Run instance of application on port 3000 using api of **production** env. 	

`yarn cordova-build`
>	Build instance of application using api of quality with valentino certificate. 	

`yarn cordova-build:uat`
>	Build instance of application using api of uat with valentino certificate. 		

`yarn cordova-build:prod`
>	Build instance of application using api of production with valentino certificate. 			
