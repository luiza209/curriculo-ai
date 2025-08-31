import React from 'react';
import FormSection from './FormSection';
import { Curriculum, Skill, Experience } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMagic } from '@fortawesome/free-solid-svg-icons';
import { openai } from '../api/openai';

const Sidebar = ({ curriculumData, setCurriculumData }) => {
  // Adicionar nova habilidade
  const addSkill = () => {
    const newSkill = { name: '', level: 'Intermediário' };
    setCurriculumData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  // Adicionar nova experiência
  const addExperience = () => {
    const newExp = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setCurriculumData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp]
    }));
  };

  // Melhorar texto com OpenAI
  const improveText = async (section, text) => {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{
        role: "user",
        content: `Melhore o seguinte texto para um currículo, tornando-o mais profissional e conciso: "${text}"`
      }]
    });

    const improvedText = response.choices[0].message.content;

    if (section === 'summary') {
      setCurriculumData(prev => ({
        ...prev,
        personal: { ...prev.personal, summary: improvedText || '' }
      }));
    }

    if (section === 'experience') {
      const improvedExperiences = prev.experiences.map(exp => ({
        ...exp,
        description: improvedText || exp.description
      }));
      setCurriculumData(prev => ({
        ...prev,
        experiences: improvedExperiences
      }));
    }
  };

  return (
    <div className="w-1/2 p-8 overflow-y-auto bg-white border-r border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800">Gerador de Currículos AI</h1>
      <p className="mb-6 text-gray-500">Gere um currículo profissional em segundos.</p>

      {/* Dados Pessoais */}
      <FormSection title="Dados Pessoais">
        <input
          type="text"
          placeholder="Nome"
          value={curriculumData.personal.name}
          onChange={(e) =>
            setCurriculumData(prev => ({
              ...prev,
              personal: { ...prev.personal, name: e.target.value }
            }))
          }
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={curriculumData.personal.email}
          onChange={(e) =>
            setCurriculumData(prev => ({
              ...prev,
              personal: { ...prev.personal, email: e.target.value }
            }))
          }
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={curriculumData.personal.phone}
          onChange={(e) =>
            setCurriculumData(prev => ({
              ...prev,
              personal: { ...prev.personal, phone: e.target.value }
            }))
          }
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="LinkedIn"
          value={curriculumData.personal.linkedin}
          onChange={(e) =>
            setCurriculumData(prev => ({
              ...prev,
              personal: { ...prev.personal, linkedin: e.target.value }
            }))
          }
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Resumo profissional"
          value={curriculumData.personal.summary}
          onChange={(e) =>
            setCurriculumData(prev => ({
              ...prev,
              personal: { ...prev.personal, summary: e.target.value }
            }))
          }
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={() => improveText('summary', curriculumData.personal.summary)}
          className="flex items-center gap-2 p-2 text-purple-600 rounded hover:bg-purple-50"
        >
          <FontAwesomeIcon icon={faMagic} />
          Melhorar Resumo
        </button>
      </FormSection>

      {/* Habilidades */}
      <FormSection title="Habilidades">
        {curriculumData.skills.map((skill, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Habilidade"
              value={skill.name}
              onChange={(e) => {
                const updatedSkills = [...curriculumData.skills];
                updatedSkills[index].name = e.target.value;
                setCurriculumData(prev => ({ ...prev, skills: updatedSkills }));
              }}
              className="flex-1 p-2 border rounded"
            />
            <select
              value={skill.level}
              onChange={(e) => {
                const updatedSkills = [...curriculumData.skills];
                updatedSkills[index].level = e.target.value;
                setCurriculumData(prev => ({ ...prev, skills: updatedSkills }));
              }}
              className="p-2 border rounded"
            >
              <option value="Básico">Básico</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>
        ))}
        <button onClick={addSkill} className="flex items-center gap-2 p-2 mt-4 text-blue-600 rounded hover:bg-blue-50">
          <FontAwesomeIcon icon={faPlus} />
          Adicionar Habilidade
        </button>
      </FormSection>

      {/* Experiências Profissionais */}
      <FormSection title="Experiências Profissionais">
        {curriculumData.experiences.map((exp, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Cargo"
              value={exp.position}
              onChange={(e) => {
                const updated = [...curriculumData.experiences];
                updated[index].position = e.target.value;
                setCurriculumData(prev => ({ ...prev, experiences: updated }));
              }}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Empresa"
              value={exp.company}
              onChange={(e) => {
                const updated = [...curriculumData.experiences];
                updated[index].company = e.target.value;
                setCurriculumData(prev => ({ ...prev, experiences: updated }));
              }}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Início"
              value={exp.startDate}
              onChange={(e) => {
                const updated = [...curriculumData.experiences];
                updated[index].startDate = e.target.value;
                setCurriculumData(prev => ({ ...prev, experiences: updated }));
              }}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Fim"
              value={exp.endDate}
              onChange={(e) => {
                const updated = [...curriculumData.experiences];
                updated[index].endDate = e.target.value;
                setCurriculumData(prev => ({ ...prev, experiences: updated }));
              }}
              className="w-full p-2 mb-2 border rounded"
            />
            <textarea
              placeholder="Descrição"
              value={exp.description}
              onChange={(e) => {
                const updated = [...curriculumData.experiences];
                updated[index].description = e.target.value;
                setCurriculumData(prev => ({ ...prev, experiences: updated }));
              }}
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              onClick={() => improveText('experience', exp.description)}
              className="flex items-center gap-2 p-2 text-purple-600 rounded hover:bg-purple-50"
            >
              <FontAwesomeIcon icon={faMagic} />
              Melhorar Descrição
            </button>
          </div>
        ))}
        <button onClick={addExperience} className="flex items-center gap-2 p-2 mt-4 text-blue-600 rounded hover:bg-blue-50">
          <FontAwesomeIcon icon={faPlus} />
          Adicionar Experiência
        </button>
      </FormSection>
    </div>
  );
};

export default Sidebar;
