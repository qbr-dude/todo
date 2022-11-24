import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Projects from './projects/projects';
import Tasks from './tasks/tasks';

type Props = {}

const AppRouter = (props: Props) => {
    return (
        <Routes>
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<Tasks />} />
            <Route path='/' element={<Navigate to="projects" />} />
        </Routes>
    )
}

export default AppRouter;