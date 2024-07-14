import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
  statusTab: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { packetId, quantity } = action.payload;
      const indexPacketId = state.items.findIndex(
        (item) => item.packetId === packetId
      );
      if (indexPacketId >= 0) {
        state.items[indexPacketId].quantity += quantity;
      } else {
        state.items.push({ packetId, quantity });
      }
      localStorage.setItem("carts", JSON.stringify(state.items));
    },
    changeQuantity(state, action) {
      const { packetId, quantity } = action.payload;
      const indexPacketId = state.items.findIndex(
        (item) => item.packetId === packetId
      );
      if (quantity > 0) {
        state.items[indexPacketId].quantity = quantity;
      } else {
        // delete state.items[indexPacketId];
        state.items = state.items.filter((item) => item.packetId !== packetId);
      }
    },
    toggleStatusTab(state) {
      if (state.statusTab === false) {
        state.statusTab = true;
      } else {
        state.statusTab = false;
      }
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("carts");
    },
  },
});

export const { addToCart, changeQuantity, toggleStatusTab, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
