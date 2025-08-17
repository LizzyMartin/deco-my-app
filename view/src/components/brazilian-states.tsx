import { useState } from "react";
import { 
  MapPin, 
  RefreshCw, 
  Search, 
  Map,
  Users,
  Globe
} from "lucide-react";
import { useListBrazilianStates, useFetchBrazilianStatesWorkflow } from "@/lib/hooks";
import { Button } from "@/components/ui/button";

interface BrazilianState {
  id: number;
  nome: string;
  sigla: string;
  regiao: {
    id: number;
    nome: string;
    sigla: string;
  };
}

export function BrazilianStates() {
  const { data: statesData } = useListBrazilianStates();
  const fetchStatesWorkflow = useFetchBrazilianStatesWorkflow();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  if (!statesData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Globe className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400">Carregando estados...</p>
        </div>
      </div>
    );
  }

  const { states, total } = statesData;

  // Get unique regions for filter
  const regions = Array.from(
    new Set(states.map((state: BrazilianState) => state.regiao.nome))
  ).sort() as string[];

  // Filter states based on search and region
  const filteredStates = states.filter((state: BrazilianState) => {
    const matchesSearch = state.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         state.sigla.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "all" || state.regiao.nome === selectedRegion;
    
    return matchesSearch && matchesRegion;
  });

  // Group states by region for statistics
  const regionStats = states.reduce((acc: Record<string, number>, state: BrazilianState) => {
    acc[state.regiao.nome] = (acc[state.regiao.nome] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Map className="h-8 w-8 text-blue-500" />
          <div>
            <h1 className="text-2xl font-bold text-white">Estados Brasileiros</h1>
            <p className="text-slate-400">Dados do Instituto Brasileiro de Geografia e Estatística (IBGE)</p>
          </div>
        </div>
        
        <Button
          onClick={() => fetchStatesWorkflow.mutate()}
          disabled={fetchStatesWorkflow.isPending}
          variant="outline"
          className="gap-2"
        >
          {fetchStatesWorkflow.isPending ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Atualizar
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-slate-400">Total de Estados</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">{total}</div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-slate-400">Regiões</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">{regions.length}</div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium text-slate-400">Filtrados</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">{filteredStates.length}</div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium text-slate-400">Região Atual</span>
          </div>
          <div className="text-lg font-bold text-white mt-1 truncate">
            {selectedRegion === "all" ? "Todas" : selectedRegion}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou sigla..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todas as Regiões</option>
          {regions.map((region: string) => (
            <option key={region} value={region}>
              {region} ({regionStats[region]} estados)
            </option>
          ))}
        </select>
      </div>

      {/* States List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStates.map((state: BrazilianState) => (
          <div
            key={state.id}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-white">{state.sigla}</span>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                    ID: {state.id}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-1">
                  {state.nome}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Globe className="h-4 w-4" />
                  <span>{state.regiao.nome}</span>
                  <span className="text-slate-600">({state.regiao.sigla})</span>
                </div>
              </div>
              
              <MapPin className="h-5 w-5 text-slate-400 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {filteredStates.length === 0 && (
        <div className="text-center py-8">
          <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Nenhum estado encontrado</h3>
          <p className="text-slate-400">
            Tente ajustar os filtros de busca ou região.
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-700">
        Dados fornecidos pelo Instituto Brasileiro de Geografia e Estatística (IBGE)
      </div>
    </div>
  );
}
