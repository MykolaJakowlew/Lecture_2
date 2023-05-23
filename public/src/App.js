import { useEffect, useRef, useState } from 'react';
import './style.css';
import axios from 'axios';
import Loading from './loading';

const Table = (props) => {
  const { table, waiters, dishes } = props;
  const [wasChanged, setWasChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const selectRef = useRef();
  const apply = () => {
    setIsLoading(true);
    axios.patch(`/tables/${table._id}`, {
      waiterId: selectRef.current.value
    }).then(async () => {
      setWasChanged(false);
      await props.refreshTables();
      setIsLoading(false);
    });
  };

  const removeWaiter = async () => {
    setIsLoading(true);
    await axios.delete(`/tables/${table._id}/waiter`);
    await props.refreshTables();
    setIsLoading(false);
  };

  const waiter = table.waiterId && waiters.find(e => e._id === table.waiterId) || {};

  const closeOrder = async () => {
    setIsLoading(true);
    await axios.patch(`/orders/${table.orderId}`, { isOpen: false });
    await axios.delete(`/tables/${table._id}/order`);
    await props.refreshTables();
    setIsLoading(false);
  };
  const createOrder = async () => {
    setIsLoading(true);
    const orderResponse = await axios.post('/orders');
    const { data: order } = orderResponse;
    await axios.patch(`/tables/${table._id}`, {
      orderId: order._id
    });
    await props.refreshTables();
    setIsLoading(false);
  };

  const [order, setOrder] = useState();
  useEffect(() => {
    if (table.orderId) {
      axios.get(`/orders/${table.orderId}`)
        .then(response => setOrder(response.data));
    }
  }, []);
  const quantityInputRef = useRef();
  const dishSelectRef = useRef();
  const addDish = async () => {
    const response = await axios.patch(`/orders/${table.orderId}/dishes`, {
      dishId: dishSelectRef.current.value,
      quantity: parseInt(quantityInputRef.current.value)
    });
    setOrder(response.data);
  };

  return (<div className='table'>
    {isLoading && <Loading />}
    <div>table id: {table.tableId}</div>
    <div>
      waiter id: {waiter.firstName || ''}
      {table.waiterId && <button onClick={removeWaiter}>clean</button>}
      {!table.waiterId &&
        <select ref={selectRef} name="waiter" onChange={() => setWasChanged(true)}>
          {waiters.map(waiter => (<option value={waiter._id}>{waiter.firstName}</option>))}
        </select>
      }
    </div>
    <div>
      orderId: {table.orderId}
      {table.orderId
        ? <button onClick={closeOrder}>Close order</button>
        : <button onClick={createOrder}>Create order</button>
      }
      {
        table.orderId
          ?
          <div>
            {order && dishes &&
              <div className='dish_table'>
                <div>name</div>
                <div>price</div>
                <div>quantity</div>
                <div>total</div>
                {order.dishes.map(dish => (<>
                  <div>{dishes.find(el => el._id === dish.dishId).name}</div>
                  <div>{dish.price}</div>
                  <div>{dish.quantity}</div>
                  <div>{dish.price * dish.quantity}</div>
                </>))}
                <div className='dish_table_total_price'>Total price: {order.dishes
                  .reduce((acc, cur) => {
                    return acc + (cur.price * cur.quantity);
                  }, 0)}
                </div>
              </div>
            }
            <div>
              <select ref={dishSelectRef}>
                {dishes.map(dish => (<option value={dish._id}>{dish.name}</option>))}
              </select>
              <input ref={quantityInputRef} type="number" />
              <button onClick={addDish}>Add</button>
            </div>
          </div>
          : null
      }
    </div>
    <div>{wasChanged ? <button onClick={apply}>Apply</button> : null}</div>
  </div>);
};

const App = () => {
  /**
   * @type {[{tableId: number,waiterId:string,orderId:string}[]]}
   */
  const [waiters, setWaiters] = useState([]);
  const [tables, setTables] = useState([]);
  const [dishes, setDishes] = useState([]);

  const refreshTables = async () => {
    const response = await axios.get('/tables');
    const { data } = response;
    setTables(data);
  };

  useEffect(() => {
    refreshTables();
    axios.get('/waiters').then((response) => {
      const { data } = response;
      setWaiters((prev) => ([...prev, ...data]));
    });
    axios.get('/dishes')
      .then(response => {
        setDishes(response.data);
      });
  }, []);

  const addTableInputRef = useRef();
  const addNewTable = () => {
    axios.post('/tables', {
      tableId: addTableInputRef.current.value
    }).then(response => {
      setTables((prev) => ([...prev, response.data]));
    });
  };

  const addWaiterInputRef = useRef();
  const addNewWaiter = () => {
    axios.post('/waiters', {
      firstName: addWaiterInputRef.current.value
    }).then(response => {
      setWaiters((prev) => ([...prev, response.data]));
    });
  };

  const addDishNameInputRef = useRef();
  const addDishPriceInputRef = useRef();
  const addNewDish = () => {
    axios.post('/dishes', {
      name: addDishNameInputRef.current.value,
      price: addDishPriceInputRef.current.value,
    }).then(response => {
      setDishes((prev) => ([...prev, response.data]));
    });
  };
  return (
    <>
      <div className='data_input'>
        <div>
          Table number: <input ref={addTableInputRef} type="number" />
          <button onClick={addNewTable}>Add new table</button>
        </div>
        <div>
          Waiter name: <input ref={addWaiterInputRef} type="text" />
          <button onClick={addNewWaiter}>Add new table</button>
        </div>
        <div>
          Dish name:
          <input ref={addDishNameInputRef} type="text" />
          <input ref={addDishPriceInputRef} type="number" />
          <button onClick={addNewDish}>Add new dish</button>
        </div>
      </div>
      <div className='tables'>
        {tables.map(table => (<Table
          dishes={dishes}
          waiters={waiters}
          table={table}
          refreshTables={refreshTables}
        />))}
      </div>
    </>
  );
};

export default App;
