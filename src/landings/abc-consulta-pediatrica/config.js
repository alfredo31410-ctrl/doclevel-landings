export const abcConsultaConfig = {
  slug: "abc-consulta-pediatrica",
  title: "El ABC de la consulta pediátrica",
  eventType: "Clase gratuita",
  date: "Lunes 2 de noviembre de 2026",
  time: "1:00 p. m.",
  timezone: "Hora CDMX",
  modality: "100% en línea",
  instructor: "Dr. Raúl Gustavo De Lira",
  activeCampaign: {
    formId: "373",
    embedUrl: "https://cefincapacitacion.activehosted.com/f/embed.php?id=373",
  },
  thankYou: {
    url: "https://www.doclevelacademy.com/landings/abc-consulta-pediatrica/gracias",
    whatsappUrl: "https://chat.whatsapp.com/JERQbkhT5POBZ9CG7oo7h4",
  },
};

export const activeCampaignFormId = abcConsultaConfig.activeCampaign.formId;
export const activeCampaignFormClass = `_form_${activeCampaignFormId}`;
export const activeCampaignFormSelector = `.${activeCampaignFormClass}`;
export const activeCampaignEmbedUrl = abcConsultaConfig.activeCampaign.embedUrl;
export const whatsappGroupUrl = abcConsultaConfig.thankYou.whatsappUrl;
export const canonicalThanksUrl = abcConsultaConfig.thankYou.url;
export const registrationTrackingKey = abcConsultaConfig.slug;

