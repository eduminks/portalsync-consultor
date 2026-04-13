import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { PaperPlaneTilt, Envelope, User, Buildings, Phone, MapPin, Clock, WhatsappLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import { AnimatedSection } from './AnimatedSection'
import { WorldMap } from './WorldMap'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().optional(),
  service: z.string().min(1, 'Selecione um serviço'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

type FormData = z.infer<typeof formSchema>

interface ContactSubmission extends FormData {
  id: string
  timestamp: string
}

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissions, setSubmissions] = useKV<ContactSubmission[]>('contact-submissions', [])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      service: '',
      message: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const submission: ContactSubmission = {
        ...data,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      }
      
      setSubmissions((current) => [...(current || []), submission])
      
      toast.success('Mensagem enviada com sucesso!', {
        description: 'Entraremos em contato em breve.',
      })
      
      form.reset()
    } catch (error) {
      toast.error('Erro ao enviar mensagem', {
        description: 'Por favor, tente novamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-18 lg:py-28 relative overflow-hidden bg-background">
      <WorldMap />

      {/* Gradiente direcional: deixa o mapa respirar no topo e protege o conteúdo abaixo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to bottom, hsl(var(--background)/0.25) 0%, hsl(var(--background)/0.55) 30%, hsl(var(--background)/0.78) 65%, hsl(var(--background)/0.95) 100%)',
        }}
      />
      {/* Vinheta lateral suave */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(ellipse 80% 100% at 50% 0%, transparent 40%, hsl(var(--background)/0.6) 100%)',
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative" style={{ zIndex: 2 }}>
        <AnimatedSection className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-3 backdrop-blur-sm">
            <Envelope className="text-accent" weight="duotone" size={16} />
            <span className="text-xs font-mono uppercase tracking-wider text-accent">
              Entre em Contato
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Vamos Conversar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos prontos para ajudar sua empresa a alcançar novos patamares.
            Entre em contato e vamos construir o futuro juntos.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <AnimatedSection delay={0.1} className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">Fale com a gente</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Seja para tirar dúvidas, solicitar um orçamento ou iniciar um projeto,
                nossa equipe está pronta para atender você.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: Envelope,
                  label: 'E-mail',
                  value: 'contato@portalsync.com.br',
                  href: 'mailto:contato@portalsync.com.br',
                },
                {
                  icon: Phone,
                  label: 'Telefone',
                  value: '+55 (47) 9999-9999',
                  href: 'tel:+554799999999',
                },
                {
                  icon: WhatsappLogo,
                  label: 'WhatsApp',
                  value: '+55 (47) 9999-9999',
                  href: 'https://wa.me/554799999999',
                },
                {
                  icon: MapPin,
                  label: 'Localização',
                  value: 'Blumenau, SC — Brasil',
                  href: null,
                },
                {
                  icon: Clock,
                  label: 'Horário de Atendimento',
                  value: 'Seg–Sex, das 8h às 18h',
                  href: null,
                },
              ].map(({ icon: Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-card/80 border border-border backdrop-blur-sm hover:border-primary/40 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 shrink-0">
                    <Icon size={20} weight="duotone" className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm font-medium hover:text-primary transition-colors truncate block"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium">{value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Card className="p-6 lg:p-7 border-2 shadow-2xl backdrop-blur-sm bg-card/90">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm">
                            <User size={16} weight="duotone" />
                            Nome Completo *
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="contact-name"
                              placeholder="Seu nome"
                              {...field}
                              className="h-9"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm">
                            <Envelope size={16} weight="duotone" />
                            Email *
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="contact-email"
                              type="email"
                              placeholder="seu@email.com"
                              {...field}
                              className="h-9"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm">
                            <Buildings size={16} weight="duotone" />
                            Empresa
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="contact-company"
                              placeholder="Nome da sua empresa"
                              {...field}
                              className="h-9"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Serviço de Interesse *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger id="contact-service" className="h-9">
                                <SelectValue placeholder="Selecione um serviço" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="desenvolvimento">Desenvolvimento de Software</SelectItem>
                              <SelectItem value="erp">Consultoria Senior ERP & HCM</SelectItem>
                              <SelectItem value="integracoes">Integração de Sistemas</SelectItem>
                              <SelectItem value="automacao">Automação Comercial</SelectItem>
                              <SelectItem value="projetos">Gestão de Projetos</SelectItem>
                              <SelectItem value="suporte">Suporte & Sustentação</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Mensagem *</FormLabel>
                          <FormControl>
                            <Textarea
                              id="contact-message"
                              placeholder="Conte-nos sobre seu projeto..."
                              className="min-h-[80px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full h-11 text-base bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/30 transition-all"
                    >
                      {isSubmitting ? (
                        <span>Enviando...</span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <PaperPlaneTilt size={18} weight="duotone" />
                          Enviar Mensagem
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
