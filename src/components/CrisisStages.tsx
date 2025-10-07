import { motion } from "framer-motion";
const stages = [{
  number: 1,
  title: "Situación",
  description: "Una situación es un evento que debe ser tratado adecuadamente para evitar que se convierta en un conflicto. Las situaciones son generalmente las causas de las 'crisis'.",
  color: "bg-green-500"
}, {
  number: 2,
  title: "Conflicto",
  description: "El conflicto surge cuando la situación identificada no se aborda a tiempo. En general, hay desacuerdo entre las partes. Estas son manifestaciones visibles de un proceso que puede convertirse en una 'crisis'.",
  color: "bg-yellow-500"
}, {
  number: 3,
  title: "Problema",
  description: "El problema surge cuando el conflicto no se aborda, también puede surgir ante una situación imprevista. Los desacuerdos son más intensos. Es una manifestación mucho más evidente del origen de una 'crisis'.",
  color: "bg-orange-500"
}, {
  number: 4,
  title: "Crisis",
  description: "Es un problema no resuelto donde los intereses de ambas partes no solo están expuestos sino también afectados. Es una situación sensible, vulnerable y visible. Las posiciones de ambas partes están totalmente afectadas.",
  color: "bg-red-500"
}, {
  number: 5,
  title: "Post-crisis",
  description: "Se trata de cómo aprovechar lo aprendido y utilizar escenarios de crisis abiertos para reforzar la reputación. * Aprendizaje * Ajuste * Evolución",
  color: "bg-blue-500"
}];
export const CrisisStages = () => {
  return <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-[80px] pb-[100px]">
      {stages.map((stage, index) => <motion.div key={stage.number} initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: index * 0.2
    }} className="bg-gray-50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-primary hover:shadow-primary/30 hover:border-primary">
          <div className={`w-8 h-8 ${stage.color} rounded-full mb-4 mx-auto flex items-center justify-center text-white font-bold`}>
            {stage.number}
          </div>
          <h3 className="text-lg font-bold mb-2 text-gray-900 text-center">{stage.title}</h3>
          <p className="text-sm text-gray-600 text-center">{stage.description}</p>
        </motion.div>)}
    </div>;
};