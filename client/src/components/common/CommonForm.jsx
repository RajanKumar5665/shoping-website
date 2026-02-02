import React from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) => {

   function renderInputBYComponentType(getControlItem){
        let element = null;
       //get the value
        const value = formData[getControlItem.name] || '';
        switch(getControlItem.componentType){
            case 'input':
                element = (<Input
                type={getControlItem.type}
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.name}
                value={value}
                onChange={(event) =>
                    setFormData({
                      ...formData,
                       [getControlItem.name] : event.target.value
                    })
                }
                />
        );  
                break;
                 case 'select':
                element = (
                   <Select
                    value={value}
                    onValueChange={(nextValue) => {
                      setFormData({
                        ...formData,
                        [getControlItem.name]: nextValue,
                      })
                    }}>
                     <SelectTrigger className='w-full'>
                       <SelectValue placeholder={getControlItem.placeholder}/>
                     </SelectTrigger>
                     <SelectContent>
                      {
                        getControlItem.options && 
                        getControlItem.options.length > 0 ?
                        getControlItem.options.map((optionItem)=> <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>)
                        : null
                      }
                     </SelectContent>
                   </Select> 
        );  
                break;
                 case 'textarea':
                element = (
                  <Textarea
                  name={getControlItem.name}
                  placeholder={getControlItem.placeholder}
                  id={getControlItem.name}
                  value={value}
                onChange={(event) =>
                    setFormData({
                      ...formData,
                       [getControlItem.name] : event.target.value
                    })
                }
                  />
                
        );  
                break;

                default:
                    element = (<input
                type={getControlItem.type}
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.name}
                 value={value}
                onChange={(event) =>
                    setFormData({
                      ...formData,
                       [getControlItem.name] : event.target.value
                    })
                }
                />
        );
           break;
        }
        return element;
    }
  return (
    <form onSubmit={onSubmit}
     action="">
       <div className='flex flex-col gap-3'>
        {
          formControls.map((controlItem)=> <div className='grid w-full gap-1.5' key={controlItem.name}>
            <Label className='mb-1'>
              {controlItem.label}
            </Label>
            {
              renderInputBYComponentType(controlItem)
            }
          </div>)}
          <Button disabled={isBtnDisabled} type="submit" className='mt-2 w-full'> {buttonText || 'Submit'}</Button>
      </div>
    </form>
  )
}

export default CommonForm
