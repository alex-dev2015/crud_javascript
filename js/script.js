let globalNames = ['Alex Sousa', 'João Dias', 'Alberto Almeida', 'Bartolomeu Júnior'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener('load', () => {
    inputName = document.querySelector('#name_user');
    preventFormSubmit();
    activateInput();
    render();
});


function preventFormSubmit(){
    function handleFormSubmit(event){
        event.preventDefault();
        
    }
    
    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput(){
    function insertName(newName){
        // globalNames.push(newName);
        globalNames = [...globalNames, newName];
    }

    function updateName(newName){
        globalNames[currentIndex] = newName;
        
    }

    function handleTyping(event){
      if(event.key === 'Enter' && event.target.value.trim()!=='')
      {
          if(isEditing){
            updateName(event.target.value);
          }else{
            insertName(event.target.value);  
          }
        
          render();
          isEditing = false;
          clearInput();
      }
    }

    inputName.addEventListener('keyup' , handleTyping);
    inputName.focus();
}

function render(){
   function createDeleteButton(index){
      function deleteName(){
        globalNames = globalNames.filter((_, i) => i !== index);

         render();
      }  

    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'X';

    button.addEventListener('click', deleteName);

    return button;
   } 

   function createSpan(name, index){
      function editItem(){
          inputName.value = name;
          inputName.focus();
          isEditing = true;
          currentIndex = index;
      }  

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = currentName; 
    span.addEventListener('click', editItem);

    return span;
   }


   var divNames = document.querySelector('#names'); 
   divNames.innerHTML = ''; 
  
   var ul   = document.createElement('ul');
   
   for(var i = 0; i < globalNames.length; i++){
      var currentName = globalNames[i]; 
      var li = document.createElement('li');
      var button = createDeleteButton(i);
      var span = createSpan(currentName, i);
      
       
      
      li.appendChild(button);
      li.appendChild(span);
      
      ul.appendChild(li);
   }
   
 
   divNames.appendChild(ul);
   clearInput();
}

// function clearInput(){
//    inputName.value = '';
//    inputName.focus(); 
// }

const clearInput = () => {
    inputName.value = '';
    inputName.focus();
}

