var documenterSearchIndex = {"docs":
[{"location":"dataset/#Dataset","page":"Dataset","title":"Dataset","text":"","category":"section"},{"location":"dataset/","page":"Dataset","title":"Dataset","text":"Pages = [\"dataset.md\"]","category":"page"},{"location":"dataset/#Type-definition","page":"Dataset","title":"Type definition","text":"","category":"section"},{"location":"dataset/","page":"Dataset","title":"Dataset","text":"Dataset","category":"page"},{"location":"dataset/#InferenceObjects.Dataset","page":"Dataset","title":"InferenceObjects.Dataset","text":"Dataset{L} <: DimensionalData.AbstractDimStack{L}\n\nContainer of dimensional arrays sharing some dimensions.\n\nThis type is an DimensionalData.AbstractDimStack that implements the same interface as DimensionalData.DimStack and has identical usage.\n\nWhen a Dataset is passed to Python, it is converted to an xarray.Dataset without copying the data. That is, the Python object shares the same memory as the Julia object. However, if an xarray.Dataset is passed to Julia, its data must be copied.\n\nConstructors\n\nDataset(data::DimensionalData.AbstractDimArray...)\nDataset(data::Tuple{Vararg{<:DimensionalData.AbstractDimArray}})\nDataset(data::NamedTuple{Keys,Vararg{<:DimensionalData.AbstractDimArray}})\nDataset(\n    data::NamedTuple,\n    dims::Tuple{Vararg{DimensionalData.Dimension}};\n    metadata=DimensionalData.NoMetadata(),\n)\n\nIn most cases, use convert_to_dataset to create a Dataset instead of directly using a constructor.\n\n\n\n\n\n","category":"type"},{"location":"dataset/#General-conversion","page":"Dataset","title":"General conversion","text":"","category":"section"},{"location":"dataset/","page":"Dataset","title":"Dataset","text":"convert_to_dataset\nnamedtuple_to_dataset","category":"page"},{"location":"dataset/#InferenceObjects.convert_to_dataset","page":"Dataset","title":"InferenceObjects.convert_to_dataset","text":"convert_to_dataset(obj; group = :posterior, kwargs...) -> Dataset\n\nConvert a supported object to a Dataset.\n\nIn most cases, this function calls convert_to_inference_data and returns the corresponding group.\n\n\n\n\n\n","category":"function"},{"location":"dataset/#InferenceObjects.namedtuple_to_dataset","page":"Dataset","title":"InferenceObjects.namedtuple_to_dataset","text":"namedtuple_to_dataset(data; kwargs...) -> Dataset\n\nConvert NamedTuple mapping variable names to arrays to a Dataset.\n\nAny non-array values will be converted to a 0-dimensional array.\n\nKeywords\n\nattrs::AbstractDict{<:AbstractString}: a collection of metadata to attach to the dataset, in addition to defaults. Values should be JSON serializable.\nlibrary::Union{String,Module}: library used for performing inference. Will be attached to the attrs metadata.\ndims: a collection mapping variable names to collections of objects containing dimension names. Acceptable such objects are:\nSymbol: dimension name\nType{<:DimensionsionalData.Dimension}: dimension type\nDimensionsionalData.Dimension: dimension, potentially with indices\nNothing: no dimension name provided, dimension name is automatically generated\ncoords: a collection indexable by dimension name specifying the indices of the given dimension. If indices for a dimension in dims are provided, they are used even if the dimension contains its own indices. If a dimension is missing, its indices are automatically generated.\n\n\n\n\n\n","category":"function"},{"location":"dataset/#DimensionalData","page":"Dataset","title":"DimensionalData","text":"","category":"section"},{"location":"dataset/","page":"Dataset","title":"Dataset","text":"As a DimensionalData.AbstractDimStack, Dataset also implements the AbstractDimStack API and can be used like a DimStack. See DimensionalData's documentation for example usage.","category":"page"},{"location":"dataset/#Tables-inteface","page":"Dataset","title":"Tables inteface","text":"","category":"section"},{"location":"dataset/","page":"Dataset","title":"Dataset","text":"Dataset implements the Tables interface. This allows Datasets to be used as sources for any function that can accept a table. For example, it's straightforward to:","category":"page"},{"location":"dataset/","page":"Dataset","title":"Dataset","text":"write to CSV with CSV.jl\nflatten to a DataFrame with DataFrames.jl\nplot with StatsPlots.jl\nplot with AlgebraOfGraphics.jl","category":"page"},{"location":"subpackages/inferenceobjectsnetcdf/#InferenceObjectsNetCDF.jl","page":"InferenceObjectsNetCDF.jl","title":"InferenceObjectsNetCDF.jl","text":"","category":"section"},{"location":"subpackages/inferenceobjectsnetcdf/","page":"InferenceObjectsNetCDF.jl","title":"InferenceObjectsNetCDF.jl","text":"InferenceObjectsNetCDF extends InferenceObjects with the ability to read InferenceData from a NetCDF file or write it to a file.","category":"page"},{"location":"subpackages/inferenceobjectsnetcdf/","page":"InferenceObjectsNetCDF.jl","title":"InferenceObjectsNetCDF.jl","text":"from_netcdf\nto_netcdf","category":"page"},{"location":"subpackages/inferenceobjectsnetcdf/#InferenceObjectsNetCDF.from_netcdf","page":"InferenceObjectsNetCDF.jl","title":"InferenceObjectsNetCDF.from_netcdf","text":"from_netcdf(path::AbstractString; kwargs...) -> InferenceData\n\nLoad an InferenceData from an unopened NetCDF file.\n\nRemaining kwargs are passed to NCDatasets.NCDataset. This method loads data eagerly. To instead load data lazily, pass an opened NCDataset to from_netcdf.\n\nExamples\n\njulia> idata = from_netcdf(\"centered_eight.nc\")\nInferenceData with groups:\n  > posterior\n  > posterior_predictive\n  > sample_stats\n  > prior\n  > observed_data\n\nfrom_netcdf(ds::NCDatasets.NCDataset; load_mode) -> InferenceData\n\nLoad an InferenceData from an opened NetCDF file.\n\nload_mode defaults to :lazy, which avoids reading variables into memory. Operations on these arrays will be slow. load_mode can also be :eager, which copies all variables into memory. It is then safe to close ds. If load_mode is :lazy and ds is closed after constructing InferenceData, using the variable arrays will have undefined behavior.\n\nExamples\n\nHere is how we might load an InferenceData from an InferenceData lazily from a web-hosted NetCDF file.\n\njulia> using HTTP, NCDatasets\n\njulia> resp = HTTP.get(\"https://github.com/arviz-devs/arviz_example_data/blob/main/data/centered_eight.nc?raw=true\");\n\njulia> ds = NCDataset(\"centered_eight\", \"r\"; memory = resp.body);\n\njulia> idata = from_netcdf(ds)\nInferenceData with groups:\n  > posterior\n  > posterior_predictive\n  > sample_stats\n  > prior\n  > observed_data\n\njulia> idata_copy = copy(idata); # disconnect from the loaded dataset\n\njulia> close(ds);\n\n\n\n\n\n","category":"function"},{"location":"subpackages/inferenceobjectsnetcdf/#InferenceObjectsNetCDF.to_netcdf","page":"InferenceObjectsNetCDF.jl","title":"InferenceObjectsNetCDF.to_netcdf","text":"to_netcdf(data, dest::AbstractString; group::Symbol=:posterior, kwargs...)\nto_netcdf(data, dest::NCDatasets.NCDataset; group::Symbol=:posterior)\n\nWrite data to a NetCDF file.\n\ndata is any type that can be converted to an InferenceData using convert_to_inference_data. If not an InferenceData, then group specifies which group the data represents.\n\ndest specifies either the path to the NetCDF file or an opened NetCDF file. If dest is a path, remaining kwargs are passed to NCDatasets.NCDataset.\n\nExamples\n\njulia> using NCDatasets\n\njulia> idata = from_namedtuple((; x = randn(4, 100, 3), z = randn(4, 100)))\nInferenceData with groups:\n  > posterior\n\njulia> to_netcdf(idata, \"data.nc\")\n\"data.nc\"\n\n\n\n\n\n","category":"function"},{"location":"inference_data/#InferenceData","page":"InferenceData","title":"InferenceData","text":"","category":"section"},{"location":"inference_data/","page":"InferenceData","title":"InferenceData","text":"Pages = [\"inference_data.md\"]","category":"page"},{"location":"inference_data/#Type-definition","page":"InferenceData","title":"Type definition","text":"","category":"section"},{"location":"inference_data/","page":"InferenceData","title":"InferenceData","text":"InferenceData","category":"page"},{"location":"inference_data/#InferenceObjects.InferenceData","page":"InferenceData","title":"InferenceObjects.InferenceData","text":"InferenceData{group_names,group_types}\n\nContainer for inference data storage using DimensionalData.\n\nThis object implements the InferenceData schema.\n\nInternally, groups are stored in a NamedTuple, which can be accessed using parent(::InferenceData).\n\nConstructors\n\nInferenceData(groups::NamedTuple)\nInferenceData(; groups...)\n\nConstruct an inference data from either a NamedTuple or keyword arguments of groups.\n\nGroups must be Dataset objects.\n\nInstead of directly creating an InferenceData, use the exported from_xyz functions or convert_to_inference_data.\n\n\n\n\n\n","category":"type"},{"location":"inference_data/#Property-interface","page":"InferenceData","title":"Property interface","text":"","category":"section"},{"location":"inference_data/","page":"InferenceData","title":"InferenceData","text":"getproperty\npropertynames","category":"page"},{"location":"inference_data/#Base.getproperty","page":"InferenceData","title":"Base.getproperty","text":"getproperty(data::InferenceData, name::Symbol) -> Dataset\n\nGet group with the specified name.\n\n\n\n\n\n","category":"function"},{"location":"inference_data/#Base.propertynames","page":"InferenceData","title":"Base.propertynames","text":"propertynames(data::InferenceData) -> Tuple{Symbol}\n\nGet names of groups\n\n\n\n\n\n","category":"function"},{"location":"inference_data/#Indexing-interface","page":"InferenceData","title":"Indexing interface","text":"","category":"section"},{"location":"inference_data/","page":"InferenceData","title":"InferenceData","text":"getindex\nBase.setindex","category":"page"},{"location":"inference_data/#Base.getindex","page":"InferenceData","title":"Base.getindex","text":"Base.getindex(data::InferenceData, groups::Symbol; coords...) -> Dataset\nBase.getindex(data::InferenceData, groups; coords...) -> InferenceData\n\nReturn a new InferenceData containing the specified groups sliced to the specified coords.\n\ncoords specifies a dimension name mapping to an index, a DimensionalData.Selector, or an IntervalSets.AbstractInterval.\n\nIf one or more groups lack the specified dimension, a warning is raised but can be ignored. All groups that contain the dimension must also contain the specified indices, or an exception will be raised.\n\nExamples\n\nSelect data from all groups for just the specified id values.\n\njulia> using InferenceObjects, DimensionalData\n\njulia> idata = from_namedtuple(\n           (θ=randn(4, 100, 4), τ=randn(4, 100));\n           prior=(θ=randn(4, 100, 4), τ=randn(4, 100)),\n           observed_data=(y=randn(4),),\n           dims=(θ=[:id], y=[:id]),\n           coords=(id=[\"a\", \"b\", \"c\", \"d\"],),\n       )\nInferenceData with groups:\n  > posterior\n  > prior\n  > observed_data\n\njulia> idata.posterior\nDataset with dimensions:\n  Dim{:chain} Sampled 1:4 ForwardOrdered Regular Points,\n  Dim{:draw} Sampled 1:100 ForwardOrdered Regular Points,\n  Dim{:id} Categorical String[a, b, c, d] ForwardOrdered\nand 2 layers:\n  :θ Float64 dims: Dim{:chain}, Dim{:draw}, Dim{:id} (4×100×4)\n  :τ Float64 dims: Dim{:chain}, Dim{:draw} (4×100)\n\nwith metadata Dict{String, Any} with 1 entry:\n  \"created_at\" => \"2022-08-11T11:15:21.4\"\n\njulia> idata_sel = idata[id=At([\"a\", \"b\"])]\nInferenceData with groups:\n  > posterior\n  > prior\n  > observed_data\n\njulia> idata_sel.posterior\nDataset with dimensions:\n  Dim{:chain} Sampled 1:4 ForwardOrdered Regular Points,\n  Dim{:draw} Sampled 1:100 ForwardOrdered Regular Points,\n  Dim{:id} Categorical String[a, b] ForwardOrdered\nand 2 layers:\n  :θ Float64 dims: Dim{:chain}, Dim{:draw}, Dim{:id} (4×100×2)\n  :τ Float64 dims: Dim{:chain}, Dim{:draw} (4×100)\n\nwith metadata Dict{String, Any} with 1 entry:\n  \"created_at\" => \"2022-08-11T11:15:21.4\"\n\nSelect data from just the posterior, returning a Dataset if the indices index more than one element from any of the variables:\n\njulia> idata[:observed_data, id=At([\"a\"])]\nDataset with dimensions:\n  Dim{:id} Categorical String[a] ForwardOrdered\nand 1 layer:\n  :y Float64 dims: Dim{:id} (1)\n\nwith metadata Dict{String, Any} with 1 entry:\n  \"created_at\" => \"2022-08-11T11:19:25.982\"\n\nNote that if a single index is provided, the behavior is still to slice so that the dimension is preserved.\n\n\n\n\n\n","category":"function"},{"location":"inference_data/#Base.setindex","page":"InferenceData","title":"Base.setindex","text":"Base.setindex(data::InferenceData, group::Dataset, name::Symbol) -> InferenceData\n\nCreate a new InferenceData containing the group with the specified name.\n\nIf a group with name is already in data, it is replaced.\n\n\n\n\n\n","category":"function"},{"location":"inference_data/#Iteration-interface","page":"InferenceData","title":"Iteration interface","text":"","category":"section"},{"location":"inference_data/","page":"InferenceData","title":"InferenceData","text":"InferenceData also implements the same iteration interface as its underlying NamedTuple. That is, iterating over an InferenceData iterates over its groups.","category":"page"},{"location":"inference_data/#General-conversion","page":"InferenceData","title":"General conversion","text":"","category":"section"},{"location":"inference_data/","page":"InferenceData","title":"InferenceData","text":"convert_to_inference_data\nfrom_dict\nfrom_namedtuple","category":"page"},{"location":"inference_data/#InferenceObjects.convert_to_inference_data","page":"InferenceData","title":"InferenceObjects.convert_to_inference_data","text":"convert_to_inference_data(obj; group, kwargs...) -> InferenceData\n\nConvert a supported object to an InferenceData object.\n\nIf obj converts to a single dataset, group specifies which dataset in the resulting InferenceData that is.\n\nSee convert_to_dataset\n\nArguments\n\nobj can be many objects. Basic supported types are:\nInferenceData: return unchanged\nDataset/DimensionalData.AbstractDimStack: add to InferenceData as the only group\nNamedTuple/AbstractDict: create a Dataset as the only group\nAbstractArray{<:Real}: create a Dataset as the only group, given an arbitrary name, if the name is not set\n\nMore specific types may be documented separately.\n\nKeywords\n\ngroup::Symbol = :posterior: If obj converts to a single dataset, assign the resulting dataset to this group.\ndims: a collection mapping variable names to collections of objects containing dimension names. Acceptable such objects are:\nSymbol: dimension name\nType{<:DimensionsionalData.Dimension}: dimension type\nDimensionsionalData.Dimension: dimension, potentially with indices\nNothing: no dimension name provided, dimension name is automatically generated\ncoords: a collection indexable by dimension name specifying the indices of the given dimension. If indices for a dimension in dims are provided, they are used even if the dimension contains its own indices. If a dimension is missing, its indices are automatically generated.\nkwargs: remaining keywords forwarded to converter functions\n\n\n\n\n\n","category":"function"},{"location":"inference_data/#InferenceObjects.from_dict","page":"InferenceData","title":"InferenceObjects.from_dict","text":"from_dict(posterior::AbstractDict; kwargs...) -> InferenceData\n\nConvert a Dict to an InferenceData.\n\nArguments\n\nposterior: The data to be converted. Its strings must be Symbol or AbstractString, and its values must be arrays.\n\nKeywords\n\nposterior_predictive::Any=nothing: Draws from the posterior predictive distribution\nsample_stats::Any=nothing: Statistics of the posterior sampling process\npredictions::Any=nothing: Out-of-sample predictions for the posterior.\nprior::Dict=nothing: Draws from the prior\nprior_predictive::Any=nothing: Draws from the prior predictive distribution\nsample_stats_prior::Any=nothing: Statistics of the prior sampling process\nobserved_data::NamedTuple: Observed data on which the posterior is conditional. It should only contain data which is modeled as a random variable. Keys are parameter names and values.\nconstant_data::NamedTuple: Model constants, data included in the model which is not modeled as a random variable. Keys are parameter names and values.\npredictions_constant_data::NamedTuple: Constants relevant to the model predictions (i.e. new x values in a linear regression).\nlog_likelihood: Pointwise log-likelihood for the data. It is recommended to use this argument as a NamedTuple whose keys are observed variable names and whose values are log likelihood arrays.\nlibrary: Name of library that generated the draws\ncoords: Map from named dimension to named indices\ndims: Map from variable name to names of its dimensions\n\nReturns\n\nInferenceData: The data with groups corresponding to the provided data\n\nExamples\n\nusing InferenceObjects\nnchains = 2\nndraws = 100\n\ndata = Dict(\n    :x => rand(ndraws, nchains),\n    :y => randn(2, ndraws, nchains),\n    :z => randn(3, 2, ndraws, nchains),\n)\nidata = from_dict(data)\n\n\n\n\n\n","category":"function"},{"location":"inference_data/#InferenceObjects.from_namedtuple","page":"InferenceData","title":"InferenceObjects.from_namedtuple","text":"from_namedtuple(posterior::NamedTuple; kwargs...) -> InferenceData\nfrom_namedtuple(posterior::Vector{Vector{<:NamedTuple}}; kwargs...) -> InferenceData\nfrom_namedtuple(\n    posterior::NamedTuple,\n    sample_stats::Any,\n    posterior_predictive::Any,\n    predictions::Any,\n    log_likelihood::Any;\n    kwargs...\n) -> InferenceData\n\nConvert a NamedTuple or container of NamedTuples to an InferenceData.\n\nIf containers are passed, they are flattened into a single NamedTuple with array elements whose first dimensions correspond to the dimensions of the containers.\n\nArguments\n\nposterior: The data to be converted. It may be of the following types:\n::NamedTuple: The keys are the variable names and the values are arrays with dimensions (ndraws, nchains[, sizes...]).\n::Vector{Vector{<:NamedTuple}}: A vector of length nchains whose elements have length ndraws.\n\nKeywords\n\nposterior_predictive::Any=nothing: Draws from the posterior predictive distribution\nsample_stats::Any=nothing: Statistics of the posterior sampling process\npredictions::Any=nothing: Out-of-sample predictions for the posterior.\nprior=nothing: Draws from the prior. Accepts the same types as posterior.\nprior_predictive::Any=nothing: Draws from the prior predictive distribution\nsample_stats_prior::Any=nothing: Statistics of the prior sampling process\nobserved_data::NamedTuple: Observed data on which the posterior is conditional. It should only contain data which is modeled as a random variable. Keys are parameter names and values.\nconstant_data::NamedTuple: Model constants, data included in the model which is not modeled as a random variable. Keys are parameter names and values.\npredictions_constant_data::NamedTuple: Constants relevant to the model predictions (i.e. new x values in a linear regression).\nlog_likelihood: Pointwise log-likelihood for the data. It is recommended to use this argument as a NamedTuple whose keys are observed variable names and whose values are log likelihood arrays.\nlibrary: Name of library that generated the draws\ncoords: Map from named dimension to named indices\ndims: Map from variable name to names of its dimensions\n\nReturns\n\nInferenceData: The data with groups corresponding to the provided data\n\nnote: Note\nIf a NamedTuple is provided for observed_data, constant_data, or predictionsconstantdata`, any non-array values (e.g. integers) are converted to 0-dimensional arrays.\n\nExamples\n\nusing InferenceObjects\nnchains = 2\nndraws = 100\n\ndata1 = (\n    x=rand(ndraws, nchains), y=randn(ndraws, nchains, 2), z=randn(ndraws, nchains, 3, 2)\n)\nidata1 = from_namedtuple(data1)\n\ndata2 = [[(x=rand(), y=randn(2), z=randn(3, 2)) for _ in 1:ndraws] for _ in 1:nchains];\nidata2 = from_namedtuple(data2)\n\n\n\n\n\n","category":"function"},{"location":"inference_data/#General-functions","page":"InferenceData","title":"General functions","text":"","category":"section"},{"location":"inference_data/","page":"InferenceData","title":"InferenceData","text":"cat\nmerge","category":"page"},{"location":"inference_data/#Base.cat","page":"InferenceData","title":"Base.cat","text":"cat(data::InferenceData...; [groups=keys(data[1]),] dims) -> InferenceData\n\nConcatenate InferenceData objects along the specified dimension dims.\n\nOnly the groups in groups are concatenated. Remaining groups are merged into the new InferenceData object.\n\nExamples\n\nHere is how we can concatenate all groups of two InferenceData objects along the existing chain dimension:\n\njulia> coords = (; a_dim=[\"x\", \"y\", \"z\"]);\n\njulia> dims = dims=(; a=[:a_dim]);\n\njulia> data = Dict(:a => randn(100, 4, 3), :b => randn(100, 4));\n\njulia> idata = from_dict(data; coords=coords, dims=dims)\nInferenceData with groups:\n  > posterior\n\njulia> idata_cat1 = cat(idata, idata; dims=:chain)\nInferenceData with groups:\n  > posterior\n\njulia> idata_cat1.posterior\nDataset with dimensions:\n  Dim{:draw},\n  Dim{:chain},\n  Dim{:a_dim} Categorical{String} String[x, y, z] ForwardOrdered\nand 2 layers:\n  :a Float64 dims: Dim{:draw}, Dim{:chain}, Dim{:a_dim} (100×8×3)\n  :b Float64 dims: Dim{:draw}, Dim{:chain} (100×8)\n\nwith metadata Dict{String, Any} with 1 entry:\n  \"created_at\" => \"2023-02-17T18:47:29.679\"\n\nAlternatively, we can concatenate along a new run dimension, which will be created.\n\njulia> idata_cat2 = cat(idata, idata; dims=:run)\nInferenceData with groups:\n  > posterior\n\njulia> idata_cat2.posterior\nDataset with dimensions:\n  Dim{:draw},\n  Dim{:chain},\n  Dim{:a_dim} Categorical{String} String[x, y, z] ForwardOrdered,\n  Dim{:run}\nand 2 layers:\n  :a Float64 dims: Dim{:draw}, Dim{:chain}, Dim{:a_dim}, Dim{:run} (100×4×3×2)\n  :b Float64 dims: Dim{:draw}, Dim{:chain}, Dim{:run} (100×4×2)\n\nwith metadata Dict{String, Any} with 1 entry:\n  \"created_at\" => \"2023-02-17T18:47:29.679\"\n\nWe can also concatenate only a subset of groups and merge the rest, which is useful when some groups are present only in some of the InferenceData objects or will be identical in all of them:\n\njulia> observed_data = Dict(:y => randn(10));\n\njulia> idata2 = from_dict(data; observed_data=observed_data, coords=coords, dims=dims)\nInferenceData with groups:\n  > posterior\n  > observed_data\n\njulia> idata_cat3 = cat(idata, idata2; groups=(:posterior,), dims=:run)\nInferenceData with groups:\n  > posterior\n  > observed_data\n\njulia> idata_cat3.posterior\nDataset with dimensions:\n  Dim{:draw},\n  Dim{:chain},\n  Dim{:a_dim} Categorical{String} String[x, y, z] ForwardOrdered,\n  Dim{:run}\nand 2 layers:\n  :a Float64 dims: Dim{:draw}, Dim{:chain}, Dim{:a_dim}, Dim{:run} (100×4×3×2)\n  :b Float64 dims: Dim{:draw}, Dim{:chain}, Dim{:run} (100×4×2)\n\nwith metadata Dict{String, Any} with 1 entry:\n  \"created_at\" => \"2023-02-17T18:47:29.679\"\n\njulia> idata_cat3.observed_data\nDataset with dimensions: Dim{:y_dim_1}\nand 1 layer:\n  :y Float64 dims: Dim{:y_dim_1} (10)\n\nwith metadata Dict{String, Any} with 1 entry:\n  \"created_at\" => \"2023-02-17T15:11:00.59\"\n\n\n\n\n\n","category":"function"},{"location":"inference_data/#Base.merge","page":"InferenceData","title":"Base.merge","text":"merge(data::InferenceData...) -> InferenceData\n\nMerge InferenceData objects.\n\nThe result contains all groups in data and others. If a group appears more than once, the one that occurs last is kept.\n\nSee also: cat\n\nExamples\n\nHere we merge an InferenceData containing only a posterior group with one containing only a prior group to create a new one containing both groups.\n\njulia> idata1 = from_dict(Dict(:a => randn(100, 4, 3), :b => randn(100, 4)))\nInferenceData with groups:\n  > posterior\n\njulia> idata2 = from_dict(; prior=Dict(:a => randn(100, 1, 3), :c => randn(100, 1)))\nInferenceData with groups:\n  > prior\n\njulia> idata_merged = merge(idata1, idata2)\nInferenceData with groups:\n  > posterior\n  > prior\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = InferenceObjects","category":"page"},{"location":"#InferenceObjects","page":"Home","title":"InferenceObjects","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"InferenceObjects.jl is a Julia implementation of the InferenceData schema for storing results of Bayesian inference. Its purpose is to serve the following three goals:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Usefulness in the analysis of Bayesian inference results.\nReproducibility of Bayesian inference analysis.\nInteroperability between different inference backends and programming languages.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The implementation consists primarily of the InferenceData and Dataset structures. InferenceObjects also provides the function convert_to_inference_data, which may be overloaded by inference packages to define how various inference outputs can be converted to an InferenceData.","category":"page"},{"location":"","page":"Home","title":"Home","text":"For examples of how InferenceData can be used, see the ArviZ.jl documentation.","category":"page"}]
}
