class Formatter {
    kelvinToCelsius(temp: number){
        const kelvin = 273.15
 
        return (temp - kelvin).toFixed()
    }
}   

export const formatter = new Formatter() 