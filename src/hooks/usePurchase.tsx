import { useState } from "react";
import { PurchaseItem } from "../interface/PurchaseItem";

const PURCHASE_ID = "purchase";

export const usePurchase = () => {
  const [purchaseItems, setPurchaseItems] = useState<Array<PurchaseItem>>([]);

  const add = (item: PurchaseItem) => {
    let purchaseList: Array<PurchaseItem> = getAll();

    if (purchaseList.length > 0) {
      const foundExistingindex = purchaseList.findIndex(
        (purchase) =>
          /* Current Purchase item is depend on the Item ID and Item Color */
          purchase.id === item.id && purchase.color === item.color
      );
      if (foundExistingindex >= 0) {
        /* Update existing items */
        purchaseList[foundExistingindex] = item;
      } else {
        /* Add new item (+ with different colors) to the list */
        purchaseList.push(item);
      }
    } else {
      /* Add new item to the list */
      purchaseList.push(item);
    }

    /* Remove all empty quantity from the list */
    purchaseList = purchaseList.filter(purchase => purchase.quantity > 0);

    sessionStorage.setItem(PURCHASE_ID, JSON.stringify(purchaseList));
    setPurchaseItems(purchaseList);
    window.location.reload();
  };

  const getAll = (): Array<PurchaseItem> => {
    const purchaseSession = sessionStorage.getItem(PURCHASE_ID);
    const existingPurchase: Array<PurchaseItem> = purchaseSession
      ? JSON.parse(purchaseSession)
      : [];
    return existingPurchase;
  };

  const findPurchase = (id: number, color: string) => {
    const purchaseList: Array<PurchaseItem> = getAll();
    return purchaseList.find(
      (purchaseItem) =>
        purchaseItem.id === id && purchaseItem.color.toString() === color
    );
  };

  return {
    purchaseItems,
    add,
    getAll,
    findPurchase,
  };
};
