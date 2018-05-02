Vue.component('addhouse', {
  props:['house', 'fn','add'],
  template: `
  <div class="form margin-top">
  <p class="form-title">Aggiungi la tua casa</p>
  <div class="form-group col-md-9 offset-md-1">
    <label for="inputCity">Città</label>
    <input v-model='house.city' type="text" class="form-control" id="inputCity" placeholder="Inserisci la città">
    <label for="inputAddress">Indirizzo</label>
    <input v-model='house.address' type="text" class="form-control" id="inputAddress" placeholder="Inserisci l'indirizzo">
    <label for="inputPrice">Prezzo</label>
    <input v-model='house.price' type="text" class="form-control" id="inputPrice" placeholder="Inserisci il prezzo per giorno">
      <div class="col-md-3 offset-md-4 margin-top">
        <button type="button" @click='fn' class="btn btn-success">Invia</button>
        </div>
  </div>
  </div>
  `
})
