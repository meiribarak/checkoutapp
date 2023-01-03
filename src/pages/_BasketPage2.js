import React from 'react';
import BasketList from '../components/checkout/BasketItemsList';
import CustomerHeader from '../components/ui/CustomerHeader';
import BasketTotal from '../components/checkout/BasketTotal';
import BasketButton from '../components/checkout/BasketButton';

//items: [{ code: "", name: "", img: "", quantity: ""}],
const DUMMY_ITEMS = [
  {
    img: 'https://us.coca-cola.com/content/dam/nagbrands/us/coke/en/products/coca-cola-original/desktop/coca-cola-original-12oz.jpg?wid=325',
    name: 'Coke Can',
    code: '111',
    quantity: '2'
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF8TCne_TOJzZy3BVCiRQVKwWB3n15DjJa1g&usqp=CAU',
    name: 'Coke Bottle',
    code: '222',
    quantity: '1'
  }
];


function BasketPage2() {  

  return (
    <section>
      <CustomerHeader/>
      <BasketList items={DUMMY_ITEMS} />
      <BasketTotal/>
      <BasketButton actionColor='green' caption='All right' navigateTo='/'/>
      <BasketButton actionColor='green' caption='Get receipt' navigateTo='/'/>
      <BasketButton actionColor='red' caption='Something is not right' navigateTo='/'/>
    </section>
  );
}

export default BasketPage2;
