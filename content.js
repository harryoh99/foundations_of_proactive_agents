// EDIT THIS FILE: text, links, section order, figures, and style settings.
// Or open editor.html for live editing, then download this file.
window.PROJECT = {
  "meta": {
    "title": "Foundations of Proactive Agents",
    "subtitle": "Principles, Technical Layers, and PROACTIVITY-GYM",
    "eyebrow": "Principles · Agent design · Evaluation",
    "summary": "Proactive agents can use idle compute to help before users ask. Making that help valuable requires more than completing tasks correctly.",
    "authors": "Jio Oh¹, Seunghyun Do¹, Young-Jun Lee², Steven Euijong Whang¹, Dongyeop Kang²",
    "affiliations": "¹ KAIST   ·   ² University of Minnesota",
    "paperUrl": "https://arxiv.org/abs/2609.37267",
    "codeUrl": "https://github.com/harryoh99/foundations_of_proactive_agents",
    "bibtex": "",
    "abstract": "Proactive LLM agents can turn idle compute into useful support before users ask. Yet even correct work can misread user context, impose review costs, or undermine trust. This work proposes foundations for designing, realizing, and evaluating proactive LLM agents around three joint principles (3T): Task Capability, anticipating relevant needs and correctly performing useful work; Temporal Allocation, allocating compute according to resource availability and when results are needed; and Trust, sustaining users’ confidence and appropriate reliance on the agent. We connect these objectives to a design space organized around five dimensions: task scope, anticipation horizon, activation trigger, processing timing, and intervention depth, and specify the situation and system modeling needed to support its choices, including user and environment representations, backbone LLMs, and agent harnesses. Lastly, we propose PROACTIVITY-GYM, a simulation-based evaluation testbed including multi-day scenarios, stateful environments, and persona-conditioned simulated users that can evaluate the consequences of proactive assistance across interactions. Evaluations across 23 model–harness configurations uncover substantial performance gaps across 3T and reveal that LLM judges often conflate task capability and trust. A human study with 30 participants demonstrates the importance of the joint 3T optimization: participants show sharp trust declines after intervention misalignment despite correct outcomes, and prefer sleep-time assistance, even when imperfect, to preserve ongoing focus. Together, these findings support designing and evaluating proactive agents through the joint consideration of useful work, compute allocation, and evolving user trust.",
    "codeComingSoon": true
  },
  "theme": {
    "accent": "#294d72",
    "background": "#ffffff",
    "contentWidth": 1080,
    "bodySize": 16
  },
  "overview": {
    "title": "From available compute to useful assistance.",
    "text": "An agent can complete useful work and still interrupt the user, compete for resources, or act beyond its delegation. We connect principles for proactive assistance to concrete design choices, system requirements, and evaluation across multiple interactions.",
    "figure": {
      "src": "assets/figure-1.png",
      "label": "Figure 1",
      "title": "The case for joint evaluation",
      "description": "",
      "caption": "With the same available compute, well-designed proactivity can increase user utility; misaligned proactivity can impose costs that outweigh its benefits. Conceptual illustration, not an empirical scaling curve.",
      "alt": "Conceptual curves contrast the utility of reactive, well-designed proactive, and misaligned proactive agents, alongside the three research objectives."
    },
    "stats": [
      {
        "value": "3",
        "label": "joint objectives"
      },
      {
        "value": "5",
        "label": "design dimensions"
      },
      {
        "value": "23",
        "label": "model–harness configurations"
      },
      {
        "value": "30",
        "label": "human participants"
      }
    ]
  },
  "findings": {
    "title": "What we find",
    "items": [
      {
        "title": "Current agents leave substantial gaps.",
        "text": "Strong task performance does not ensure effective temporal allocation or alignment with intervention preferences.",
        "target": "agent-results"
      },
      {
        "title": "LLM trust judgments can follow task quality.",
        "text": "Judge-based trust scores track task capability more closely than intervention-depth alignment, motivating separate measurements.",
        "target": "agent-results"
      },
      {
        "title": "People care about more than correct outcomes.",
        "text": "Participants prefer deferred help that preserves focus, and trust can remain below its initial level after a misaligned intervention.",
        "target": "human-study"
      }
    ]
  },
  "sections": [
    {
      "id": "principles",
      "nav": "Principles",
      "enabled": true,
      "eyebrow": "Principles",
      "title": "Three objectives, considered together.",
      "intro": "We define proactivity as anticipatory behavior intended to address gaps in users’ needs, opportunities, or problems without an explicit request. The 3T objectives distinguish useful work, compute allocation, and the user’s confidence in the agent.",
      "cards": [
        {
          "title": "Task Capability",
          "text": "Anticipate relevant needs and correctly perform useful work.",
          "tone": "tc"
        },
        {
          "title": "Temporal Allocation",
          "text": "Allocate compute over time according to resource availability and when results are needed.",
          "tone": "ta"
        },
        {
          "title": "Trust",
          "text": "Sustain the user’s confidence and willingness to rely on the agent’s recommendations, actions, and decisions.",
          "tone": "tr"
        }
      ],
      "figures": [
        {
          "src": "assets/figure-2.png",
          "label": "Figure 2",
          "title": "An illustrative research workflow",
          "description": "",
          "caption": "The agent defers missing ablations and an executive summary until compute is available. It updates the delegated appendix, but holds the main-text summary for approval at the next interaction.",
          "alt": "A research workflow progresses from a busy 9 PM interaction through overnight preparation to an 8 AM handoff, respecting different delegation preferences."
        }
      ],
      "note": "Intervention depth is a behavioral proxy for trust, not a complete definition of trust. Its interpretation depends on the user, the task, and the history of interaction."
    },
    {
      "id": "technical-layers",
      "nav": "Technical layers",
      "enabled": true,
      "eyebrow": "Technical layers",
      "title": "From principles to agent design.",
      "intro": "We organize proactive assistance along five design dimensions and describe the modeling components needed to support those choices. The backbone LLM and its harness both matter.",
      "figureTabs": true,
      "figures": [
        {
          "src": "assets/figure-3.png",
          "label": "Figure 3",
          "title": "Design space",
          "description": "These dimensions describe the space of possible proactive behaviors, from work within the current task to preparation beyond the current interaction.",
          "caption": "Five dimensions characterize proactive assistance: task scope, anticipation horizon, activation trigger, processing timing, and intervention depth.",
          "alt": "The design space organizes five dimensions and shows how example tasks select different configurations."
        },
        {
          "src": "assets/figure-4.png",
          "label": "Figure 4",
          "title": "Situation & system modeling",
          "description": "Situation modeling tracks goals, preferences, task state, resources, and deadlines. System modeling specifies the LLM, tools, memory, scheduling, permissions, and continuity of work.",
          "caption": "Interaction history, memory, and observations inform representations of the user and environment. The LLM and harness select actions; outcomes and feedback update the context.",
          "alt": "A feedback loop connects user and environment context, situation modeling, system modeling, and the proactive design space."
        }
      ],
      "note": "Explicit observations, such as a user’s delegation, should remain distinguishable from inferred states, such as attention or confidence."
    },
    {
      "id": "gym",
      "nav": "Gym",
      "enabled": true,
      "eyebrow": "PROACTIVITY-GYM",
      "title": "Evaluate the interactions that follow.",
      "intro": "A correct action can change what happens next. PROACTIVITY-GYM is an initial simulation-based testbed for evaluating proactive assistance over multiple days, with stateful tools, scheduled events, and persona-conditioned user feedback.",
      "figures": [
        {
          "src": "assets/figure-5.png",
          "label": "Figure 5",
          "title": "Inside PROACTIVITY-GYM",
          "description": "",
          "caption": "In this example, an agent prepares a rebooking option during sleep time, asks for approval the next morning, books the flight, and later resumes deferred work.",
          "alt": "The gym combines agents, personas, scenarios, a user simulator, and a stateful environment, illustrated by a multi-day flight rebooking timeline."
        }
      ],
      "stats": [
        {
          "value": "10",
          "label": "multi-day scenarios"
        },
        {
          "value": "3",
          "label": "personas per scenario"
        },
        {
          "value": "7–10",
          "label": "simulated days per scenario"
        },
        {
          "value": "3",
          "label": "runs per scenario–persona pair"
        }
      ],
      "cards": [
        {
          "title": "Task capability · TC",
          "text": "Rule-based checks and semantic assessments measure explicit requests, latent needs, and the quality of useful work. Score: 0–100.",
          "tone": "tc"
        },
        {
          "title": "Temporal allocation · TA",
          "text": "Measures whether the agent prioritizes urgent work and defers competing tasks under resource and deadline constraints. Score: %.",
          "tone": "ta"
        },
        {
          "title": "Trust · TR-D / TR-J",
          "text": "TR-D measures intervention-depth agreement (%). TR-J rates five trust constructs using persona and cumulative history (1–5).",
          "tone": "tr"
        }
      ],
      "note": "Time is simulated. This testbed provides a first step toward dynamic evaluation, with simplified resource constraints and user models."
    },
    {
      "id": "agent-results",
      "nav": "Agent results",
      "enabled": true,
      "eyebrow": "Agent evaluation",
      "title": "Task performance tells only part of the story.",
      "intro": "Across 23 model–harness configurations, current agents struggle to coordinate the three objectives. Improvements depend on both the model and the harness, and do not transfer uniformly across metrics.",
      "figures": [
        {
          "src": "assets/figure-6.png",
          "label": "Figure 6",
          "title": "Model performance, harness effects, and metric relationships",
          "description": "",
          "caption": "(a) Performance across model families and sizes. (b) Task capability across three harnesses for five open models. (c) Run-level Pearson correlations among the four metrics.",
          "alt": "Three panels compare model scores, changes in task capability across harnesses, and correlations between task capability, temporal allocation, and two trust metrics."
        }
      ],
      "cards": [
        {
          "title": "Substantial gaps remain",
          "text": "Claude Opus 5 has the highest average TC (65.1), but reaches 51.7% TA and 52.4% TR-D. All other models remain below 20% TA."
        },
        {
          "title": "Harness effects are mixed",
          "text": "For Claude Opus 5, switching from Claude Code to OpenClaw raises TC by 4.6 points and TA by 21.1 percentage points, while lowering TR-D by 3.8 percentage points."
        },
        {
          "title": "Trust scores need scrutiny",
          "text": "TC correlates weakly with TA and TR-D (r = 0.31 and 0.34), but more strongly with judge-based TR-J (r = 0.70)."
        }
      ],
      "note": "High judge ratings for understandability and competence can coexist with poor intervention alignment. These results suggest that LLM judges may give task quality more weight when assessing trust. Reasoning is disabled in the main comparison; the paper reports a separate reasoning-effort ablation."
    },
    {
      "id": "human-study",
      "nav": "Human study",
      "enabled": true,
      "eyebrow": "Human study",
      "title": "Correct work can still be unwelcome.",
      "intro": "Thirty participants evaluated 14 scenario themes, including week-long interaction logs. Paired choices and repeated ratings examine assistance quality, temporal allocation, and trust across interactions.",
      "figures": [
        {
          "src": "assets/figure-7.png",
          "label": "Figure 7",
          "title": "Human judgments of temporal allocation and trust",
          "description": "",
          "caption": "(a) Acceptance of competing, correct assistance versus deferred assistance requiring revision. (b) Trust changes after aligned (A) and misaligned (M) interventions. (c) Trust trajectories across Days 2, 4, and 7.",
          "alt": "Charts show acceptance increasing from 26.7% to 97.8% with deferral, a larger trust loss than recovery, and incomplete trust recovery in an aligned–misaligned–aligned sequence."
        }
      ],
      "cards": [
        {
          "title": "Alignment matters beyond correctness",
          "text": "Participants prefer correct assistance in 92.2% of comparisons. At equal content quality, they choose intervention-aligned agents in 88.3% of comparisons."
        },
        {
          "title": "Deferral can make assistance valuable",
          "text": "Acceptance rises from 26.7% for correct help competing with ongoing tasks to 97.8% for sleep-time help requiring revision the next morning."
        },
        {
          "title": "Trust can be easier to lose than rebuild",
          "text": "An aligned-to-misaligned transition reduces trust by 1.86 points; the reverse increases it by 1.27. In the A–M–A sequence, trust recovers to 3.43, below its initial 4.43."
        }
      ],
      "quotes": [
        {
          "text": "Even if it needs correction tomorrow, I should focus on what matters now and delegate as much as possible to the agent.",
          "attribution": "P12 · Sleep-time assistance"
        },
        {
          "text": "After one wrong action, an agent has to consistently behave well for a long time to recover trust.",
          "attribution": "P26 · Trust recovery"
        }
      ],
      "note": "These findings come from scenario-based judgments, not a longitudinal deployment with participants’ own agents."
    },
    {
      "id": "outlook",
      "nav": "Outlook",
      "enabled": true,
      "eyebrow": "Outlook",
      "title": "A foundation for the next generation of proactive agents.",
      "intro": "The goal is to support useful initiative while accounting for compute, ongoing work, and evolving user trust. These principles, technical layers, and initial evaluations provide a starting point for that research.",
      "cards": [
        {
          "title": "Joint optimization",
          "text": "Develop agents that reason across the objectives and adapt their choices to user and task context."
        },
        {
          "title": "Richer environments",
          "text": "Extend the gym with more detailed resource models, user states, and action spaces."
        },
        {
          "title": "Longer-term evaluation",
          "text": "Study how usefulness, reliance, and trust evolve in real workflows beyond short simulated horizons."
        }
      ],
      "note": "The paper’s limitations include finite scenarios and personas, simulated rather than wall-clock time, and simplified user and resource models."
    }
  ]
};
