class MiniMaple{
    
    input_string = new String();
    variant = new String();
    
    constructor(input_string, variant)
    {
        if(this.#check_param(input_string) && this.#check_param(variant)){
            this.input_string = input_string;
            this.variant = variant;
        }
    }

    GetInputString() { return this.input_string; }
    GetVarinat() { return this.variant; }

    SetInputString(input_string)
    {
        if(this.#check_param(input_string)){
            this.input_string = input_string   
            return true;
        }

        return false;
    }
    
    SetVariant(variant)
    {
        if(this.#check_param(variant)){
            this.variant = variant  
            return true;
        }
        
        return false;
    }

    ConvertPolinom()
    {
        return this.#ConvertPartToString(this.#Differentiate(this.#CreateParts()));
    }

    #ConvertPartToString(part)
    {
        let result = part.GetSign();
        let coefficient = part.GetCoefficient();
        let exponent = part.GetExponent();
        let base = part.GetBase();

        if (coefficient !== 1 || (base === '' || exponent !== 0)) {
            result += coefficient !== 1 ? coefficient: '';
        }

        if (base !== '' && exponent!== 0) {
            result += coefficient !== 1 ? '*':'';
            result += base;
        }

        if (exponent !== 0 && exponent > 1) {  
            result += '^' + exponent;
        } else if (exponent !== 0 && exponent < 0) {
            result += '^(' + exponent + ')';
        }

        return result;
    }
    
    #DifferentiatePart(part)
    {
        if (this.variable !== part.GetBase()) {
            return new Part('+', 0, '', 0);
        }

        let resultCoefficient = part.GetCoefficient() * part.GetExponent();
        let resultExponent = 0;
        let resultSign = part.GetSign();

        if (part.GetExponent() === 0) {
            return new Part('+', 0, '', 0);
        } 
        else {
            resultExponent = part.GetExponent() - 1;
            
            if (part.GetExponent() < 0) {
                resultSign = this.sign === '-' ? '+': '-';
            } 
        }

        if (resultExponent === 0) {
            return new Part(resultSign, Math.abs(resultCoefficient), '', 0);
        } else {
            return new Part(resultSign, Math.abs(resultCoefficient), part.GetBase(), resultExponent);
        }
    }
    
    #Differentiate(parts) 
    {

        let derivatives = parts.map(part => this.#DifferentiatePart(part));
        let result = derivatives.join('');
    
        return result.startsWith('+') ? result.slice(1) : result;
    }

    #CreateParts()
    {
        const regular_expression = /(?<sign>[-+]?)(?<coef>\d*\.\d+|\d+)?\*?(?<base>\w)(?:\^(?:\(?(?<exponent>-?\d+)\)?))?/g;
        const parts = [];

        let piece = regular_expression.exec(this.input_string);
        
        while (piece !== null) {
            parts.push(new Part(piece[1] || '+', Number(piece[2]) || 1, piece[3], Number(piece[4]) || 1));
            
            piece = regular_expression.exec(this.input_string);
        }

        return parts;
    }
    
    #check_param(param) {
        if(param && param != "" && typeof param === 'string'){
            return true;
        }
        else{
            return false;
        }
    } 
}

class Part {

    constructor(sign, coef, base, exponent) 
    {
        this.sign = sign;
        this.coefficient = coef;
        this.base = base;
        this.exponent = exponent;
    }
    
    GetSign(){ return this.sign; }
    GetCoefficient(){ return this.coefficient; }
    GetBase(){ return this.base; }
    GetExponent(){ return this.exponent; }
}
export {MiniMaple}