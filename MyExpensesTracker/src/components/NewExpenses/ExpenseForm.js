import "./ExpenseForm.css";
import React, {useState} from 'react'

const ExpenseForm = (props) => {

  const [enteredTitle, setEnteredTitle]=useState('');
  const [enteredAmount, setEnteredAmount]=useState('');
 const [enteredDate, setEnteredDate]=useState('');

 // instead of using muttiple states for each component we can use one state instead as follows.
//  const[userInput,setUserInput]=useState({
//   enteredTitle:'',
//   enteredAmount:'',
//   enteredDate:'',
//  });

  const titleChangeHandler=(event)=>{
   setEnteredTitle(event.target.value);
  
   //  setUserInput({
  //   ...userInput,
  //   enteredTitle: event.target.value,
  //  })

  //even better way than the above is as follows. ie react also has a prevState that keeps the privious state for you.
  // setUserInput((prevState)=>{
  //   return {...prevState, enteredTitle: event.target.value};
  // })
  };
   
  const amountChangeHandler=(event)=>{
   setEnteredAmount(event.target.value);
  //  setUserInput({
  //   ...userInput,
  //   enteredAmount: event.target.value,
  //  })

  // setUserInput((prevState)=>{
  //   return {...prevState, enteredAmount: event.target.value};
  // })
  };
  const dateChangeHandler=(event)=>{
    setEnteredDate(event.target.value);
  //   setUserInput({
  //   ...userInput,
  //   enteredDate: event.target.value,
  //  })

  // setUserInput((prevState)=>{
  //   return {...prevState, enteredDate: event.target.value};
  // })
  };

  const submitHandler=(event)=>{
     event.preventDefault(); //THIS WILL PREVENT REACT FROM REFRESHING THE WHOLE PAGE WHEN SOME CHANGE HAPPENS INSIDE THE  COMPONENT.
     
     const expenseData={        //this is a new object created by collecting the form data from all the text fields and will be given back to the App.js expenses ARRAY.
     
             title:enteredTitle,
             amount: + enteredAmount, 
             date:new Date(enteredDate)
       
    };
  //the line below is the trick to lift states up from child to parent..here we recieved onSaveExpenseData as prop
  //but we execute it here but its implementation is handled in the above parent, but since we are calling here, it help us to pass the new data as argument back to its implementation handler in the parent chiled.
  props.onSaveExpenseData(expenseData); //this method is passed to here as a props, and we are executing here. the aruguemnt is helping us to send the new object back to its method implementation in the expenses folder.
    
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">

         <div className="new-expense__controls">
          <label>{enteredTitle}</label>
          <input type="text" value={enteredTitle} onChange={titleChangeHandler} />  
        </div>

        <div className="new-expense__controls">
          <label>{enteredAmount}</label>
          <input type="number"  min="0.01" step="0.01" value={enteredAmount} onChange={amountChangeHandler}/>
        </div>

        <div className="new-expense__controls">
          <label>{enteredDate}</label>
          <input type="date" min="2019-01-01" max="2022-12-31" value={enteredDate} onChange={dateChangeHandler}/>
        </div>
      </div>

      <div className="new-expense__actions"> 
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type="submit">Add Expense</button>
      </div>

    </form>
  );
};

export default ExpenseForm;

//Note that we have used a concept calle the two-way binding where use the state-update-function to take the field data to creat a new expense object and at the same time reset/clear the fields back to the default status using the value attribute.