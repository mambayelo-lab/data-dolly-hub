"use client";
import { useRef, useEffect, useState } from "react";
import {
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  Sparkles,
  ChevronDown,
  RefreshCw,
  Hexagon,
  Zap,
  Server,
  Shield,
  Database,
  BarChart3,
  Globe2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useAgentStore } from "@/stores/agent-store";
import { cn } from "@/lib/utils";
import type { AgentType } from "@/types";

const AGENT_CONFIG: Record<AgentType, { label: string; color: string; Icon: React.ComponentType<{ size?: number }> }> = {
  supervisor:    { label: "AURA",       color: "#8b5cf6", Icon: Sparkles },
  strategy:      { label: "Stratégie",  color: "#a855f7", Icon: BarChart3 },
  bizcap:        { label: "BizCap",     color: "#f97316", Icon: Hexagon },
  architecture:  { label: "Archi",      color: "#3b82f6", Icon: Server },
  eventsourcing: { label: "EventStorm", color: "#f97316", Icon: Zap },
  infra:         { label: "Infra",      color: "#06b6d4", Icon: Globe2 },
  data:          { label: "Data",       color: "#10b981", Icon: Database },
  cyber:         { label: "Cyber",      color: "#ef4444", Icon: Shield },
  migration:     { label: "Migration",  color: "#f59e0b", Icon: RefreshCw },
  benchmark:     { label: "Benchmark",  color: "#ec4899", Icon: BarChart3 },
  integrations:  { label: "Intégration",color: "#64748b", Icon: Globe2 },
};

const QUICK_PROMPTS = [
  "Génère une Business Capability Map pour une entreprise retail",
  "Lance un Event Storming sur le processus commande-livraison",
  "Design une architecture microservices pour un e-commerce",
  "Identifie les anti-patterns dans mon SI",
  "T-shirt sizing pour migrer vers le cloud",
  "Qu'est-ce que la méthode CESAMES ?",
];

export function AgentChat({ compact = false }: { compact?: boolean }) {
  const { messages, isLoading, sendMessage, clearMessages } = useAgentStore();
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(messages.length <= 1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput("");
    setShowQuickPrompts(false);
    await sendMessage(msg);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Reconnaissance vocale non supportée sur ce navigateur.");
      return;
    }
    const SpeechRecognition =
      (window as unknown as { webkitSpeechRecognition: new () => SpeechRecognition }).webkitSpeechRecognition ||
      (window as unknown as { SpeechRecognition: new () => SpeechRecognition }).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + (prev ? " " : "") + transcript);
    };
    recognition.start();
  };

  return (
    <div className={cn("flex flex-col h-full", compact ? "text-xs" : "text-sm")}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center">
            <Sparkles size={14} className="text-violet-400" />
          </div>
          <div>
            <div className="font-semibold text-slate-100 text-xs">AURA Agent</div>
            <div className="text-[9px] text-slate-500">Architecture Intelligence</div>
          </div>
        </div>
        <button
          onClick={clearMessages}
          className="text-slate-600 hover:text-slate-400 transition-colors"
          title="Effacer la conversation"
        >
          <RefreshCw size={13} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const agentConf = msg.agent
            ? AGENT_CONFIG[msg.agent] ?? AGENT_CONFIG.supervisor
            : AGENT_CONFIG.supervisor;

          return (
            <div
              key={msg.id}
              className={cn("flex gap-2.5", msg.role === "user" && "flex-row-reverse")}
            >
              {/* Avatar */}
              <div className="flex-shrink-0 mt-0.5">
                {msg.role === "user" ? (
                  <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center">
                    <User size={14} className="text-slate-400" />
                  </div>
                ) : (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: `${agentConf.color}20` }}
                  >
                    <agentConf.Icon size={14} style={{ color: agentConf.color }} />
                  </div>
                )}
              </div>

              {/* Bubble */}
              <div className={cn("max-w-[85%] flex flex-col gap-1", msg.role === "user" && "items-end")}>
                {msg.role === "assistant" && msg.agent && (
                  <div
                    className="text-[9px] font-semibold uppercase tracking-wide"
                    style={{ color: agentConf.color }}
                  >
                    {agentConf.label}
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-2xl px-3 py-2.5 leading-relaxed",
                    msg.role === "user"
                      ? "bg-violet-600/20 border border-violet-500/30 text-slate-200 rounded-tr-sm"
                      : "bg-slate-800/80 border border-slate-700/50 text-slate-300 rounded-tl-sm"
                  )}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-invert prose-xs max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <span className="text-xs">{msg.content}</span>
                  )}
                </div>

                {/* Artifacts badges */}
                {msg.artifacts && msg.artifacts.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {msg.artifacts.map((a, i) => (
                      <span
                        key={i}
                        className="text-[9px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400"
                      >
                        ✦ {a.type === "canvas_update" ? "Canvas mis à jour" : a.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
              <Sparkles size={14} className="text-violet-400" />
            </div>
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1.5 items-center">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
                <span className="text-[10px] text-slate-500 ml-1">AURA analyse...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      {showQuickPrompts && (
        <div className="px-4 pb-3">
          <div className="text-[9px] text-slate-600 uppercase tracking-wide mb-2">
            Suggestions rapides
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {QUICK_PROMPTS.slice(0, 4).map((p) => (
              <button
                key={p}
                onClick={() => {
                  setInput(p);
                  setShowQuickPrompts(false);
                  inputRef.current?.focus();
                }}
                className="text-left text-[10px] px-3 py-2 rounded-lg border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-150"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-3 pb-3">
        <div className="flex items-end gap-2 bg-slate-800/60 border border-slate-700/60 rounded-xl p-2 focus-within:border-violet-500/50 transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Décrivez votre contexte ou posez une question..."
            rows={1}
            className="flex-1 resize-none bg-transparent text-xs text-slate-200 placeholder-slate-600 outline-none leading-relaxed max-h-24 overflow-y-auto"
            style={{ minHeight: 24 }}
          />
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={handleVoice}
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center transition-all",
                isListening
                  ? "bg-red-500/20 text-red-400 animate-pulse"
                  : "text-slate-600 hover:text-slate-400 hover:bg-slate-700/60"
              )}
              title="Entrée vocale"
            >
              {isListening ? <MicOff size={13} /> : <Mic size={13} />}
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center transition-all",
                input.trim() && !isLoading
                  ? "bg-violet-500 text-white hover:bg-violet-600"
                  : "bg-slate-700/60 text-slate-600 cursor-not-allowed"
              )}
            >
              <Send size={12} />
            </button>
          </div>
        </div>
        <div className="text-[9px] text-slate-700 text-center mt-1.5">
          Entrée pour envoyer · Maj+Entrée pour nouvelle ligne
        </div>
      </div>
    </div>
  );
}
