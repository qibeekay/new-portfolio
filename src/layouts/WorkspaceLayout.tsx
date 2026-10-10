import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/workspace/Sidebar';
import { ChannelHeader } from '../components/workspace/ChannelHeader';
import { ChannelThread } from '../components/workspace/ChannelThread';
import { channels } from '../data/channels';
import { Intro } from '../pages/workspace/Intro';
import { OriginChannel } from '../pages/workspace/OriginChannel';
import { SkillsChannel } from '../pages/workspace/SkillsChannel';
import { ProjectsChannel } from '../pages/workspace/ProjectsChannel';
import { ExperienceChannel } from '../pages/workspace/ExperienceChannel';
import { ContactChannel } from '../pages/workspace/ContactChannel';

/** The default portfolio: a team workspace where each section is a channel. */
export function WorkspaceLayout() {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const channel = channels.find((item) => item.path === pathname) ?? channels[0];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white font-sans text-work-ink">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen ? (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-work-ink/40 lg:hidden"
          aria-label="Close channel list"
        />
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <ChannelHeader channel={channel} onOpenSidebar={() => setSidebarOpen(true)} />
        <ChannelThread key={channel.id} channelName={channel.name}>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/origin" element={<OriginChannel />} />
            <Route path="/powers" element={<SkillsChannel />} />
            <Route path="/case-files" element={<ProjectsChannel />} />
            <Route path="/chronicles" element={<ExperienceChannel />} />
            <Route path="/signal" element={<ContactChannel />} />
            <Route path="*" element={<Intro />} />
          </Routes>
        </ChannelThread>
      </div>
    </div>
  );
}

// Backward-compatibility alias
export { WorkspaceLayout as WorkspaceShell };
