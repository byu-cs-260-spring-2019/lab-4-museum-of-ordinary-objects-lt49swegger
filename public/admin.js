var app = new Vue
({
  el: '#admin',
  data: {
    title: "",
    findTitle: "",
    findItem: null,
    selected:  "",
    addItem: null,
    items: [],
    photos: [
      {name: 'baseball', id: 1, path: 'baseball.jpg'},
      {name: 'car', id: 2, path: 'car.jpg'},
      {name: 'glasses', id: 3, path: 'glasses.jpg'},
      {name: 'paintbrush', id: 4, path: 'paintbrush.jpg'},
      {name: 'pen', id: 5, path: 'pen.jpg'},
      {name: 'scissors', id: 6, path: 'scissors.jpg'},
      {name: 'shovel.jpg', id: 7, path: 'shovel.jpg'},
      {name: 'slinky', id: 8, path: 'slinky.jpg'},
    ],
  },
  methods: {
    async editItem(item) {
      try {
        let response = await axios.put("/api/items/" + item.id, {
          title: this.findItem.title,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    created() {
      this.getItems();
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        let response = await axios.delete("/api/items/" + item.id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addNewItem()
    {
      console.log("we got this far");
      try {
        let result = await axios.post('/api/items', {
          title: this.title,
          path: this.selected.path
        });
        this.addItem = result.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    }
  },
});
