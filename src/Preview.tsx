import React from 'react';
import { Curriculum } from '../types';

interface PreviewProps {
  curriculumData: Curriculum;
}

const Preview: React.FC<PreviewProps> = ({ curriculumData }) => {
  const { personal, skills, experiences } = curriculumData;

  return (
    <div className="w-1/2 p-8 overflow-y-auto bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        
        {/* Seção de Dados Pessoais */}
        <div className="mb-6">
          <h2 className="text-4xl font-extrabold text-blue-800">{personal.name}</h2>
          <p className="text-gray-600">{personal.email}</p>
          <p className="text-gray-600">{personal.phone}</p>
          <p className="text-gray-600">{personal.linkedin}</p>
        </div>

        {/* Resumo */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-1">Resumo</h3>
          <p className="mt-2 text-gray-700 italic">{personal.summary}</p>
        </div>

        {/* Habilidades */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-1">Habilidades</h3>
            <ul className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <li key={index} className="px-3 py-1 text-sm text-white bg-blue-600 rounded-full">
                  {skill.name} ({skill.level})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Experiências Profissionais */}
        {experiences.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-1">Experiência Profissional</h3>
            {experiences.map((exp, index) => (
              <div key={index} className="mt-4 border-b pb-4">
                <h4 className="text-lg font-bold text-gray-800">{exp.position}</h4>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                <p className="mt-1 text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;