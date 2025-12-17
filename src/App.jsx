import React, { useState, useEffect } from "react";
import "./App.css";
import Visualiser from "./control/Visualiser";
import Control from "./control/Control";
import { bubbleSort } from "./algorithm/bubblesort.js";
import{ MergeSort } from "./algorithm/MergeSort.js";
import { selectionSort } from "./algorithm/SelectionSort.js";

function App() {
  const [array, setArray] = useState([]);
  const [userInuptArray, setUserInuptArray] = useState("");
  const [speed, setSpeed] = useState(100);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState('');

  useEffect(() => {
    const userInput = userInuptArray.split(",");
    const filteredInput = userInput
      .filter((item) => !isNaN(item) && Number.isInteger(parseFloat(item)))
      .map((item) => Number(item) <= 500 && Number(item));
    setArray([...filteredInput]);
  }, [userInuptArray]);
  const handleGenerateArray = () => {
    const newArray = Array.from({ length: 15 }, () =>
      Math.floor(Math.random() * 500)
    );
    setArray(newArray);
  };
  const reSet = () => {
    setArray([])
    setSelectedSorting('')
  };
  const handlesorting = (e) => {
    const sortingmethod = e.target.value;
    setSelectedSorting(sortingmethod);
    setIsSorting(true);
    let animationArr = [];
    switch (sortingmethod) {
      case "bubblesort":
        animationArr = bubbleSort(array);
        BubbleAnimation(animationArr);
        break;
      case "mergeSort":
        animationArr = MergeSort(array);
        animateMergeSorting(animationArr);
        break;
      case "selectionSort":
        animationArr = selectionSort(array);
        animateSelectionSorting(animationArr);
        break;
      default:
        break;
    }
  };

  function BubbleAnimation(animation) {
    const barEle = document.getElementsByClassName("bar");
    for (let i = 0; i < animation.length; i++) {
      let [barOneIdx, barTwoIdx, isSwap] = animation[i];
      let barOne = barEle[barOneIdx];
      let barTwo = barEle[barTwoIdx];
      setTimeout(() => {
        // Change color to indicate comparison
        barOne.style.backgroundColor = isSwap ? "red" : "yellow";
        barTwo.style.backgroundColor = isSwap ? "red" : "yellow";
        if (isSwap) {
          // Swap heights
          let tempHeight = barOne.style.height;
          barOne.style.height = barTwo.style.height;
          barTwo.style.height = tempHeight;
          let tempValue = barOne.innerText;
          barOne.innerText = barTwo.innerText;
          barTwo.innerText = tempValue;
        }
        setTimeout(() => {
          barOne.style.backgroundColor = "blue";
          barTwo.style.backgroundColor = "blue";
        }, speed);
      }, i * speed);
    }
    setTimeout(() => {
      for (let j = 0; j < barEle.length; j++) {
        setTimeout(() => {
          barEle[j].style.backgroundColor = "green";
        }, j * speed);
      }
      setIsSorting(false);
    }, animation.length * speed);
  }
  const animateMergeSorting = (animations) => {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOne = bars[barOneIdx];
        const barTwo = bars[barTwoIdx];
        const color = i % 3 === 0 ? "yellow" : "blue";
        setTimeout(() => {
          barOne.style.backgroundColor = color;
          barTwo.style.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOne = bars[barOneIdx];
          barOne.style.height = `${newHeight}px`;
          barOne.innerHTML = newHeight;
        }, i * speed);
      }
    }

    setTimeout(() => {
      for (let j = 0; j < bars.length; j++) {
        setTimeout(() => {
          bars[j].style.backgroundColor = "green";
        }, j * speed);
      }
      setIsSorting(false);
    }, animations.length * speed);
  };
  const animateSelectionSorting = (animations) => {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, swap] = animations[i];
      const barOne = bars[barOneIdx];
      const barTwo = bars[barTwoIdx];
      setTimeout(() => {
        barOne.style.backgroundColor = swap ? "red" : "yellow";
        barTwo.style.backgroundColor = swap ? "red" : "yellow";
        if (swap) {
          const tempHeight = barOne.style.height;
          barOne.style.height = barTwo.style.height;
          barTwo.style.height = tempHeight;
          const tempContent = barOne.innerHTML;
          barOne.innerHTML = barTwo.innerHTML;
          barTwo.innerHTML = tempContent;
        }
        setTimeout(() => {
          barOne.style.backgroundColor = "blue";
          barTwo.style.backgroundColor = "blue";
        }, speed);
      }, i * speed);
    }
    setTimeout(() => {
      for (let j = 0; j < bars.length; j++) {
        setTimeout(() => {
          bars[j].style.backgroundColor = "green";
        }, j * speed);
      }
      setIsSorting(false);
    }, animations.length * speed);
  };
  return (
    <div className="App">
      <Control
        handleGenerateArray={handleGenerateArray}
        handlesorting={handlesorting}
        userInuptArray={userInuptArray}
        setUserInuptArray={setUserInuptArray}
        setSpeed={setSpeed}
        reSet={reSet}
        isSorting={isSorting}
        speed={speed}
        selectedSorting={selectedSorting}
      />
      <Visualiser array={array} />
    </div>
  );
}

export default App;
