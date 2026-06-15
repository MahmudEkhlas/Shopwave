export const delivery_option = [
    {
        id: '1',
        delivery_time: 7,
        delivery_cost: 0
    },
    {
        id: '2',
        delivery_time: 3,
        delivery_cost: 499
    },
    {
        id: '3',
        delivery_time: 1,
        delivery_cost: 999
    }
];

export function getdeliveryoption(deliveryOption_id ){
    let deliveryOption;
    delivery_option.forEach((Option) => {
      if (deliveryOption_id === Option.id) {
        deliveryOption = Option;
      }
    });
    return deliveryOption || delivery_option[0];
}