'use client'

import { Avatar, Select, SelectItem, Slider, Spacer } from "@nextui-org/react"
import React, { ChangeEvent } from "react"
import { useEffect, useState } from "react"



type Props = {
    setStudentCount: React.Dispatch<React.SetStateAction<number>>
}



const OptionsMenu: React.FC<Props> = ({setStudentCount}) => {

    const [showMenu, setShowMenu] = useState<boolean | undefined>()
    const [theme, setTheme] = useState<string>('dark')
    const [lastTheme, setLastTheme] = useState<string>('dark');

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    
    React.useEffect( () => {
        changeTheme(theme)
    }, [theme]);
        

    function changeTheme(themeName:string){
        let body = document.querySelector("body");
        if(body != null){
            body.classList.remove(lastTheme)
            body.classList.add(theme) 
            body.classList.add("text-foreground") 
            body.classList.add("background")
            setLastTheme(theme);
        }
             
    }
    


    const handleStudentCountSliderChange = (newValue:number | number[]) => {
        if(typeof(newValue) === "number"){
            setStudentCount(newValue)
        }
        else{
            setStudentCount(newValue[0])
        } 

        
    }

    const handleThemeChange = (e:ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value);
    }

    return (
        <>
            <div className="menu">
                <img className="menu-icon" src="/icons/settings.png"  onClick={toggleMenu}></img>
                
            </div>
            <div className={showMenu === undefined ? "menu-sidebar" : showMenu ? "menu-sidebar open" : "menu-sidebar close"} >
                <Slider 
                    size="md"
                    step={1}
                    color="primary"
                    label="Nombre d'élèves"
                    showSteps={false} 
                    maxValue={35} 
                    minValue={10} 
                    defaultValue={25}
                    className="max-w-md" 
                    onChange={handleStudentCountSliderChange}
                    />

                <Spacer y={6} />
                <Select
                className="max-w-xs"
                label="Thème"
                onChange={handleThemeChange}
                disallowEmptySelection={true}
                >
                    <SelectItem
                        key="dark"
                        startContent={<Avatar alt="Bleu/Noir" className="w-6 h-6" src="/icons/blackblue.png" />}
                    >
                        Bleu/Noir
                    </SelectItem>
                    <SelectItem
                        key="light"
                        startContent={<Avatar alt="Bleu/Blanc" className="w-6 h-6" src="icons/whiteblue.png" />}
                    >
                        Bleu/Blanc
                    </SelectItem>

                </Select>

            </div>
            

        </>
      )
}

export default OptionsMenu;