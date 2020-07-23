module.exports = (docs, tekton, report) => {
  for (const template of Object.values(tekton.triggerTemplates)) {
    for (const resourceTemplate of template.spec.resourcetemplates) {
      if (resourceTemplate.kind !== 'PipelineRun') continue;
      if (!tekton.pipelines[resourceTemplate.spec.pipelineRef.name]) {
        report(`TriggerTemplate '${template.metadata.name}' references pipeline '${resourceTemplate.spec.pipelineRef.name}', but the referenced pipeline cannot be found.`, resourceTemplate.spec.pipelineRef, 'name');
      }
    }
  }
};