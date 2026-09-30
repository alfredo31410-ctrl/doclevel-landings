export const landingConfig = {
  slug: "las-primeras-hrs-de-tu-bebe",
  title: "Las primeras horas de tu bebé",
  eventType: "Clase gratuita",
  date: "7 de octubre",
  time: "6:00 PM",
  timezone: "Hora CDMX",
  instructor: "Dr. Raúl G. de Lira López",
  activeCampaign: {
    formId: "355",
    embedUrl: "https://cefincapacitacion.activehosted.com/f/embed.php?id=355",
  },
  thankYou: {
    url: "https://www.doclevelacademy.com/landings/las-primeras-hrs-de-tu-bebe/gracias",
    whatsappUrl: "https://chat.whatsapp.com/INy8BoDjG7ALKJk5OUJthL",
  },
};

export const activeCampaignFormId = landingConfig.activeCampaign.formId;
export const activeCampaignFormClass = `_form_${activeCampaignFormId}`;
export const activeCampaignFormSelector = `.${activeCampaignFormClass}`;
export const activeCampaignEmbedUrl = landingConfig.activeCampaign.embedUrl;
export const whatsappGroupUrl = landingConfig.thankYou.whatsappUrl;
export const canonicalThanksUrl = landingConfig.thankYou.url;
export const registrationTrackingKey = landingConfig.slug;
