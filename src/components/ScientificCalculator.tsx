import React, { useState } from 'react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('');

  const errorStates = ['Error', 'Syntax Error', 'Div by Zero', 'Domain Error', 'Invalid Input'];

  const appendToDisplay = (value: string) => {
    setDisplay(prev => {
      if (errorStates.includes(prev)) return value;
      return prev + value;
    });
  };

  const clearCalc = () => {
    setDisplay('');
  };

  const deleteChar = () => {
    setDisplay(prev => {
      if (errorStates.includes(prev)) return '';
      return prev.slice(0, -1);
    });
  };

  const calculate = () => {
    try {
      if (!display) return;
      // Safe eval equivalent using Function for basic math operations
      // Replace symbols for standard JS operators and math functions
      const expression = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');

      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${expression}`)();
      
      if (result === Infinity || result === -Infinity) {
        setDisplay('Div by Zero');
      } else if (Number.isNaN(result)) {
        setDisplay('Domain Error');
      } else if (typeof result !== 'number') {
        setDisplay('Syntax Error');
      } else {
        // Round to avoid crazy decimal places
        const rounded = Math.round(result * 100000000) / 100000000;
        setDisplay(String(rounded));
      }
    } catch (e: any) {
      if (e instanceof SyntaxError) {
        setDisplay('Syntax Error');
      } else if (e instanceof ReferenceError) {
        setDisplay('Invalid Input');
      } else {
        setDisplay('Error');
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col h-full bg-transparent max-w-[400px] sm:max-w-[480px] mx-auto w-full min-h-[500px]">
      <div className="flex flex-col mb-4">
        <p className="text-sm font-semibold text-teal-600 mb-1 uppercase tracking-wider">Math</p>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight hidden">Calculator</h2>
      </div>

      <div className="flex-grow flex flex-col mt-2 p-2 sm:p-3 bg-slate-100/50 backdrop-blur-sm rounded-[2rem] border border-white/40 shadow-inner">
        <div className="bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[1.5rem] p-4 sm:p-6 mb-4 sm:mb-5 min-h-[100px] sm:min-h-[120px] flex flex-col justify-end overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-5 left-6 text-slate-400 text-sm font-bold tracking-widest uppercase">Deg</div>
          <div className="text-4xl sm:text-5xl font-light tracking-tight truncate w-full text-right transition-all text-slate-800" dir="ltr">
            {display || '0'}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 flex-grow">
          {/* Row Sci 1 */}
          <button onClick={() => appendToDisplay('sin(')} className="p-2 sm:p-3 bg-white/40 backdrop-blur-md rounded-2xl text-slate-700 font-semibold text-sm sm:text-base hover:bg-white/80 hover:text-teal-700 border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.12)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1">
            sin
          </button>
          <button onClick={() => appendToDisplay('cos(')} className="p-2 sm:p-3 bg-white/40 backdrop-blur-md rounded-2xl text-slate-700 font-semibold text-sm sm:text-base hover:bg-white/80 hover:text-teal-700 border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.12)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1">
            cos
          </button>
          <button onClick={() => appendToDisplay('tan(')} className="p-2 sm:p-3 bg-white/40 backdrop-blur-md rounded-2xl text-slate-700 font-semibold text-sm sm:text-base hover:bg-white/80 hover:text-teal-700 border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.12)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1">
            tan
          </button>
          <button onClick={() => appendToDisplay('^')} className="p-2 sm:p-3 bg-white/40 backdrop-blur-md rounded-2xl text-slate-700 font-semibold text-sm sm:text-base hover:bg-white/80 hover:text-teal-700 border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.12)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1">
            xⁿ
          </button>

          {/* Row Sci 2 */}
          <button onClick={() => appendToDisplay('log(')} className="p-2 sm:p-3 bg-white/40 backdrop-blur-md rounded-2xl text-slate-700 font-semibold text-sm sm:text-base hover:bg-white/80 hover:text-teal-700 border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.12)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1">
            log
          </button>
          <button onClick={() => appendToDisplay('ln(')} className="p-2 sm:p-3 bg-white/40 backdrop-blur-md rounded-2xl text-slate-700 font-semibold text-sm sm:text-base hover:bg-white/80 hover:text-teal-700 border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.12)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1">
            ln
          </button>
          <button onClick={() => appendToDisplay('√(')} className="p-2 sm:p-3 bg-white/40 backdrop-blur-md rounded-2xl text-slate-700 font-semibold text-sm sm:text-base hover:bg-white/80 hover:text-teal-700 border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.12)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1">
            √
          </button>
          <button onClick={() => appendToDisplay('π')} className="p-2 sm:p-3 bg-white/40 backdrop-blur-md rounded-2xl text-slate-700 font-semibold text-sm sm:text-base hover:bg-white/80 hover:text-teal-700 border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.12)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1">
            π
          </button>

          {/* Row 1 */}
          <button onClick={clearCalc} className="p-2 sm:p-3 bg-red-50/60 backdrop-blur-md rounded-2xl text-red-600 font-bold text-lg sm:text-xl hover:bg-red-100/80 hover:text-red-700 shadow-[0_4px_12px_rgba(239,68,68,0.06)] hover:shadow-[0_8px_20px_rgba(239,68,68,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(239,68,68,0.1)] focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-1 uppercase border border-red-200/50">
            C
          </button>
          <button onClick={deleteChar} className="p-2 sm:p-3 bg-slate-200/40 backdrop-blur-md rounded-2xl text-slate-700 font-bold text-xl sm:text-2xl hover:bg-slate-200/80 hover:text-slate-800 transition-all duration-300 border border-white/60 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:ring-offset-1 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/><line x1="18" x2="12" y1="9" y2="15"/><line x1="12" x2="18" y1="9" y2="15"/></svg>
          </button>
          <button onClick={() => appendToDisplay('(')} className="p-2 sm:p-3 bg-slate-200/30 backdrop-blur-md rounded-2xl text-slate-700 font-bold text-xl sm:text-2xl hover:bg-slate-200/60 border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:ring-offset-1">
            (
          </button>
          <button onClick={() => appendToDisplay(')')} className="p-2 sm:p-3 bg-slate-200/30 backdrop-blur-md rounded-2xl text-slate-700 font-bold text-xl sm:text-2xl hover:bg-slate-200/60 border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:ring-offset-1">
            )
          </button>

          {/* Row 2 */}
          <button onClick={() => appendToDisplay('7')} className="p-2 sm:p-3 bg-white/70 backdrop-blur-md rounded-2xl text-slate-800 font-semibold text-2xl sm:text-3xl hover:bg-white hover:text-teal-700 border border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-1">
            7
          </button>
          <button onClick={() => appendToDisplay('8')} className="p-2 sm:p-3 bg-white/70 backdrop-blur-md rounded-2xl text-slate-800 font-semibold text-2xl sm:text-3xl hover:bg-white hover:text-teal-700 border border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-1">
            8
          </button>
          <button onClick={() => appendToDisplay('9')} className="p-2 sm:p-3 bg-white/70 backdrop-blur-md rounded-2xl text-slate-800 font-semibold text-2xl sm:text-3xl hover:bg-white hover:text-teal-700 border border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-1">
            9
          </button>
          <button onClick={() => appendToDisplay('÷')} className="p-2 sm:p-3 bg-teal-50/60 backdrop-blur-md rounded-2xl text-teal-700 font-medium text-3xl sm:text-4xl hover:bg-teal-100/80 hover:text-teal-800 border border-teal-200/50 shadow-[0_4px_12px_rgba(20,184,166,0.06)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(20,184,166,0.1)] focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1 flex justify-center items-center">
             ÷
          </button>

          {/* Row 3 */}
          <button onClick={() => appendToDisplay('4')} className="p-2 sm:p-3 bg-white/70 backdrop-blur-md rounded-2xl text-slate-800 font-semibold text-2xl sm:text-3xl hover:bg-white hover:text-teal-700 border border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-1">
            4
          </button>
          <button onClick={() => appendToDisplay('5')} className="p-2 sm:p-3 bg-white/70 backdrop-blur-md rounded-2xl text-slate-800 font-semibold text-2xl sm:text-3xl hover:bg-white hover:text-teal-700 border border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-1">
            5
          </button>
          <button onClick={() => appendToDisplay('6')} className="p-2 sm:p-3 bg-white/70 backdrop-blur-md rounded-2xl text-slate-800 font-semibold text-2xl sm:text-3xl hover:bg-white hover:text-teal-700 border border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-1">
            6
          </button>
          <button onClick={() => appendToDisplay('×')} className="p-2 sm:p-3 bg-teal-50/60 backdrop-blur-md rounded-2xl text-teal-700 font-medium text-3xl sm:text-4xl hover:bg-teal-100/80 hover:text-teal-800 border border-teal-200/50 shadow-[0_4px_12px_rgba(20,184,166,0.06)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(20,184,166,0.1)] focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1 flex justify-center items-center">
            ×
          </button>

          {/* Row 4 */}
          <button onClick={() => appendToDisplay('1')} className="p-2 sm:p-3 bg-white/70 backdrop-blur-md rounded-2xl text-slate-800 font-semibold text-2xl sm:text-3xl hover:bg-white hover:text-teal-700 border border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-1">
            1
          </button>
          <button onClick={() => appendToDisplay('2')} className="p-2 sm:p-3 bg-white/70 backdrop-blur-md rounded-2xl text-slate-800 font-semibold text-2xl sm:text-3xl hover:bg-white hover:text-teal-700 border border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-1">
            2
          </button>
          <button onClick={() => appendToDisplay('3')} className="p-2 sm:p-3 bg-white/70 backdrop-blur-md rounded-2xl text-slate-800 font-semibold text-2xl sm:text-3xl hover:bg-white hover:text-teal-700 border border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-1">
            3
          </button>
          <button onClick={() => appendToDisplay('-')} className="p-2 sm:p-3 bg-teal-50/80 backdrop-blur-sm rounded-2xl text-teal-700 font-medium text-3xl sm:text-4xl hover:bg-teal-100 hover:text-teal-800 border border-teal-100/50 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 active:shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1 flex justify-center items-center">
            -
          </button>

          {/* Row 5 */}
          <button onClick={() => appendToDisplay('0')} className="p-2 sm:p-3 bg-white/70 backdrop-blur-md rounded-2xl text-slate-800 font-semibold text-2xl sm:text-3xl hover:bg-white hover:text-teal-700 border border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-1">
            0
          </button>
          <button onClick={() => appendToDisplay('.')} className="p-2 sm:p-3 bg-white/70 backdrop-blur-md rounded-2xl text-slate-800 font-bold text-2xl sm:text-3xl hover:bg-white hover:text-teal-700 border border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-1 flex justify-center items-center">
            .
          </button>
          <button onClick={calculate} className="p-2 sm:p-3 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl text-white font-medium text-3xl sm:text-4xl hover:from-teal-500 hover:to-teal-700 transition-all duration-300 shadow-[0_8px_20px_rgba(20,184,166,0.3)] hover:shadow-[0_12px_25px_rgba(20,184,166,0.4)] active:scale-95 active:shadow-[inset_0_4px_12px_rgba(0,0,0,0.2)] border border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1 flex justify-center items-center">
            =
          </button>
          <button onClick={() => appendToDisplay('+')} className="p-2 sm:p-3 bg-teal-50/60 backdrop-blur-md rounded-2xl text-teal-700 font-medium text-3xl sm:text-4xl hover:bg-teal-100/80 hover:text-teal-800 border border-teal-200/50 shadow-[0_4px_12px_rgba(20,184,166,0.06)] hover:shadow-[0_8px_20px_rgba(20,184,166,0.15)] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_8px_rgba(20,184,166,0.1)] focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1 flex justify-center items-center">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
