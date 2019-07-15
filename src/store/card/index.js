/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";
import { formatCardInfo } from "../../utils/helpers";

export const CardStore = types
  .model("CardStore", {
    cardInfo: types.model({
      cardNumber: types.string,
      expiryYear: types.number,
      expiryMonth: types.number,
      cvv: types.string,
      cardType: types.string,
      fullName: types.string
    })
  })
  .actions(self => ({
    setCardInfo(value) {
      self.cardInfo = {
        ...self.cardInfo,
        ...formatCardInfo(value)
      };
    }
  }));
