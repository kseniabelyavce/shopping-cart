
- **Main Screen**
    - Show a list of items (layout and style are flexible).
    - Each item should have a name, description, price, and a button to add the item to the cart.
    - Clicking “Add to Cart” opens the cart sidebar.
    - The main screen also has a cart button in the header that opens the cart sidebar.
- **Basic Cart functionality:**
    - When the cart is empty, it should show a placeholder.
    - The cart opens as a sidebar (on top of the main screen).
    - Clicking outside the cart sidebar should close it.
    - Users can remove items and change the quantity of each item.
    - Users see the subtotal amount (in $).
    - Users can click on “Clear Cart” or “Continue to Checkout,” which closes the shopping cart with a relevant notification (success).
    - Items should be automatically removed from the cart after 30 days if not purchased.
- **Shared Cart Functionality**:
    - Multiple users should be able to share a cart.
    - Users can add items to the shared cart and view items that others have added.


In order to see users collaboration localStorage is used (imitation):
- open two tabs in the browser and you will see changes are syncing 
