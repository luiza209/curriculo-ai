import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Preview from './components/Preview';
import { Curriculum } from './types';
import './index.css';

const App: React.FC = () => {
  const [curriculumData, setCurriculumData] = useState<Curriculum>({
    personal: { name: '', email: '', phone: '', linkedin: '', summary: '' },
    skills: [],
    experiences: [],
  });

  return (
    <div className="flex w-full h-screen font-sans bg-gray-100">
      <Sidebar 
        curriculumData={curriculumData} 
        setCurriculumData={setCurriculumData} 
      />
      <Preview 
        curriculumData={curriculumData} 
      />
    </div>
  );
};

export default App;